import merge from 'lodash/merge';
import buildDataProvider from 'ra-data-graphql';
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
import pluralize from 'pluralize';

const defaultOptions = {
  introspection: {
    operationNames: {
      [GET_LIST]: (resource: any) => `list${pluralize(resource.name)}`,
      [GET_ONE]: (resource: any) => `get${resource.name}`,
      [GET_MANY]: (resource: any) => `list${pluralize(resource.name)}`,
      [GET_MANY_REFERENCE]: (resource: any) =>
        `list${pluralize(resource.name)}`,
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
  const client = createClient({ ...options, schema: schema.data });
  const buildQuery = defaultBuildQuery({ queries, mutations });

  return buildDataProvider(
    merge({ client, buildQuery }, defaultOptions, options)
  ).then((defaultDataProvider: any) => {
    return (fetchType: any, resource: any, params: any) => {
      // Amplify does not support multiple deletions so instead we send multiple DELETE requests
      // This can be optimized using the apollo-link-batch-http link
      if (fetchType === DELETE_MANY) {
        const { ids, ...otherParams } = params;
        return Promise.all(
          params.ids.map((id: string) =>
            defaultDataProvider(DELETE, resource, {
              id,
              ...otherParams,
            })
          )
        ).then(results => {
          const data = results.reduce(
            (acc: any, { data }: any): any => [...acc, data.id],
            []
          );

          return { data };
        });
      }
      // Amplify does not support multiple deletions so instead we send multiple UPDATE requests
      // This can be optimized using the apollo-link-batch-http link
      if (fetchType === UPDATE_MANY) {
        const { ids, ...otherParams } = params;
        return Promise.all(
          params.ids.map((id: string) =>
            defaultDataProvider(UPDATE, resource, {
              id,
              ...otherParams,
            })
          )
        ).then(results => {
          const data = results.reduce(
            (acc: any, { data }: any): any => [...acc, data.id],
            []
          );

          return { data };
        });
      }

      return defaultDataProvider(fetchType, resource, params);
    };
  });
};