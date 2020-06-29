import merge from 'lodash/merge';
import buildGraphQLProvider from 'ra-data-graphql';
import {
  DELETE,
  DELETE_MANY,
  UPDATE,
  UPDATE_MANY,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
} from 'ra-core';

import defaultBuildQuery from './buildQuery';
import { createClient } from './createClient';

const SINGLE_OPERATION_MAP: Record<string, string> = {
  [GET_MANY]: GET_ONE,
  [UPDATE_MANY]: UPDATE,
  [DELETE_MANY]: DELETE,
};

const defaultOptions = {
  introspection: {
    operationNames: {
      [GET_LIST]: (resource: any) => `list${resource.name}s`,
      [GET_ONE]: (resource: any) => `get${resource.name}`,
      [GET_MANY]: (resource: any) => `list${resource.name}s`,
      [GET_MANY_REFERENCE]: (resource: any) => `list${resource.name}s`,
      [CREATE]: (resource: any) => `create${resource.name}`,
      [UPDATE]: (resource: any) => `update${resource.name}`,
      [DELETE]: (resource: any) => `delete${resource.name}`,
    },
    exclude: undefined,
    include: undefined,
  },
};

export const buildAmplifyProvider = ({
  queries,
  mutations,
  schema,
  ...options
}: any) => {
  const client = createClient({ ...options });
  const buildQuery = defaultBuildQuery({ queries, mutations, schema });
  const args = merge({ client, buildQuery }, defaultOptions, options, {
    introspection: { schema: schema.data.__schema },
  });

  return buildGraphQLProvider(args).then((defaultDataProvider: any) => {
    return (fetchType: any, resource: any, params: any) => {
      // Amplify does not support multiple deletions so instead we send multiple DELETE requests
      // This can be optimized using the apollo-link-batch-http
      const { ids, ...otherParams } = params;
      console.log(`FETCH TYPE: ${fetchType}`);
      switch (fetchType) {
        case DELETE_MANY:
          return Promise.all(
            params.ids.map((id: string) =>
              defaultDataProvider(SINGLE_OPERATION_MAP[fetchType], resource, {
                id,
                ...otherParams,
              })
            )
          ).then((results) => {
            const data = results.reduce(
              (acc: any, _: any, idx: any): any => [...acc, params.ids[idx]],
              []
            );

            return { data };
          });
        case UPDATE_MANY:
        case GET_MANY:
          return Promise.all(
            params.ids.map((id: string) =>
              defaultDataProvider(SINGLE_OPERATION_MAP[fetchType], resource, {
                id,
                ...otherParams,
              })
            )
          ).then((results) => {
            const data =
              fetchType === GET_MANY
                ? results.map((result: any) => result.data)
                : results.reduce(
                    (acc: any, { data }: any): any => [...acc, data.id],
                    []
                  );

            return { data };
          });
        default:
          return defaultDataProvider(fetchType, resource, params);
      }
    };
  });
};
