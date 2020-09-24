import { S3Object } from '../types';
/* eslint-disable default-case */
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';

import getFinalType from './getFinalType';
import isList from './isList';

const sanitizeValue = (type: any, value: any) => {
  if (type.name === 'Int') {
    return parseInt(value, 10);
  }

  if (type.name === 'Float') {
    return parseFloat(value);
  }

  return value;
};

const castType = (value: any, type: any) => {
  switch (`${type.kind}:${type.name}`) {
    case 'SCALAR:Int':
      return Number(value);

    case 'SCALAR:String':
      return String(value);

    case 'SCALAR:Boolean':
      return Boolean(value);

    default:
      return value;
  }
};

const cleanS3Object = (input: S3Object) => {
  const fields = ['key', 'level', 'identityId', 'region', 'bucket'];
  return Object.entries(input).reduce(
    (acc: any, [k, v]: [string, unknown]): Record<string, string> => {
      if (fields.includes(k)) {
        acc[k] = v;
      }
      return acc;
    },
    {}
  );
};

const prepareParams = (
  params: any,
  queryType: any,
  introspectionResults: any
) => {
  const result: any = {};

  if (!params) {
    return params;
  }

  Object.keys(params).forEach(async key => {
    const param: any = params[key];
    let arg: any = null;

    if (!param) {
      result[key] = param;
      return;
    }

    if (queryType && Array.isArray(queryType.args)) {
      arg = queryType.args.find((item: any) => item.name === key);
    }

    if (param instanceof File || key === 'rawFile') {
      // file upload should be handled with Storage
      return;
    }

    if (param instanceof Date) {
      result[key] = param.toISOString();
      return;
    }

    if (
      param instanceof Object &&
      !Array.isArray(param) &&
      arg &&
      arg.type.kind === 'INPUT_OBJECT'
    ) {
      const args = introspectionResults.types.find(
        (item: any) =>
          item.kind === arg.type.kind && item.name === arg.type.name
      ).inputFields;
      result[key] = prepareParams(param, { args }, introspectionResults);
      return;
    }

    if (
      param instanceof Object &&
      (!param as any) instanceof Date &&
      !Array.isArray(param)
    ) {
      result[key] = prepareParams(param, queryType, introspectionResults);
      return;
    }

    if (!arg) {
      result[key] = param;
      return;
    }

    result[key] = castType(param, arg.type);
  });

  return result;
};

/**
 * This handles filtering and sorting.
 */
const buildGetListVariables = (introspectionResults: any) => (
  resource: any,
  _aorFetchType: string,
  params: any
  ) => {
  console.log('params: ', params);
  // console.log(params);

  const { nextToken: token } = params.filter || {};
  const nextToken = token && params.pagination.page > 1 ? token : undefined;
  console.log('nextToken: ', nextToken);
  // return {};
  return {
    nextToken,
  };
  let variables: any = { filter: {} };
  if (params.filter) {
    variables.filter = Object.keys(params.filter).reduce((acc, key) => {
      if (key === 'ids') {
        return { ...acc, ids: params.filter[key] };
      }

      if (typeof params.filter[key] === 'object') {
        const type = introspectionResults.types.find(
          (t: any) => t.name === `${resource.type.name}Filter`
        );
        const filterSome = type.inputFields.find(
          (t: any) => t.name === `${key}_some`
        );

        if (filterSome) {
          const filter = Object.keys(params.filter[key]).reduce(
            (acc, k) => ({
              ...acc,
              [`${k}_in`]: params.filter[key][k],
            }),
            {}
          );
          return { ...acc, [`${key}_some`]: filter };
        }
      }

      const parts = key.split('.');

      if (parts.length > 1) {
        if (parts[1] === 'id') {
          const type = introspectionResults.types.find(
            (t: any) => t.name === `${resource.type.name}Filter`
          );
          const filterSome = type.inputFields.find(
            (t: any) => t.name === `${parts[0]}_some`
          );

          if (filterSome) {
            return {
              ...acc,
              [`${parts[0]}_some`]: { id: params.filter[key] },
            };
          }

          return { ...acc, [parts[0]]: { id: params.filter[key] } };
        }

        const resourceField = resource.type.fields.find(
          (f: any) => f.name === parts[0]
        );
        const type = getFinalType(resourceField.type);
        return {
          ...acc,
          [key]: sanitizeValue(type, params.filter[key]),
        };
      }

      const resourceField = resource.type.fields.find(
        (f: any) => f.name === key
      );

      if (resourceField) {
        const type = getFinalType(resourceField.type);
        const isAList = isList(resourceField.type);

        if (isAList) {
          return {
            ...acc,
            [key]: Array.isArray(params.filter[key])
              ? params.filter[key].map((value: any) =>
                  sanitizeValue(type, value)
                )
              : sanitizeValue(type, [params.filter[key]]),
          };
        }

        return {
          ...acc,
          [key]: sanitizeValue(type, params.filter[key]),
        };
      }

      return { ...acc, [key]: params.filter[key] };
    }, {});
  }

  if (params.pagination) {
    variables.page = parseInt(params.pagination.page, 10) - 1;
    variables.perPage = parseInt(params.pagination.perPage, 10);
  }

  if (params.sort) {
    variables.sortField = params.sort.field;
    variables.sortOrder = params.sort.order;
  }

  return variables;
};

/**
 * This handles sanitisation of upload data.
 */
const buildCreateUpdateVariables = (introspectionResults: any) => (
  // unused, left for code cohesion. Can remove in future iterations if unused.
  _resource: any,
  _fetchType: any,
  // used arguments
  params: any,
  queryType: any
) => {
  /** Get the accepted arguments from the schema introspection */
  const inputArgument = queryType.args.find((a: any) => a.name === 'input');
  const inputTypeName = getFinalType(inputArgument.type);
  const { inputFields } = introspectionResults.types.find(
    (t: any) => t.name === inputTypeName.name
  );

  /** Generate GraphQL input */
  const input = Object.keys(params.data).reduce((acc, key) => {
    /** Get the input field (i.e. CreatePostInput) for validation */
    const inputField = inputFields.find((f: any) => f.name === key);

    /** Skip any params passed that are not an input field */
    if (
      !inputField ||
      !inputFields.find((f: any) => f.name === inputField.name)
    ) {
      return acc;
    }

    /** Strip any S3Objects of unnecessary fields, pulling only what we need. */
    if (getFinalType(inputField.type).name?.match(/S3Object/i)) {
      /** S3Object fields could be an array. */
      const cleanS3Param = Array.isArray(params.data[key])
        ? params.data[key].map(cleanS3Object)
        : cleanS3Object(params.data[key]);

      return {
        ...acc,
        [key]: cleanS3Param,
      };
    }

    return {
      ...acc,
      [key]: params.data[key],
    };
  }, {});

  return { input };
};

export default (introspectionResults: any) => (
  resource: any,
  aorFetchType: string,
  params: any,
  queryType: any
) => {
  const preparedParams = prepareParams(params, queryType, introspectionResults);

  switch (aorFetchType) {
    case GET_LIST: {
      return buildGetListVariables(introspectionResults)(
        resource,
        aorFetchType,
        preparedParams
      );
    }
    case GET_MANY:
      return (preparedParams.ids as []).reduce(
        (acc: Record<string, string>, id: string, i: number) => {
          acc[`id${i}`] = id;
          return acc;
        },
        {}
      );
    // return {
    //   limit: params.ids.length,
    //   filter: {
    //     or: params.ids.map((id: string | number) => ({ id: { eq: id } })),
    //   },
    // };
    case GET_MANY_REFERENCE:
      // grab the arg the secondary GSI key is searching for an use that
      // as the param in our query.
      const query = introspectionResults.queries.find(
        (q: any) => q.name === params.target
      );
      if (!query) {
        throw Error(
          `Couldn't find a query for ${params.target}. Did you forget to add a param queryField to your @key directive for ${params.target}? See https://github.com/mayteio/ra-aws-amplify#a-post-with-comments-using-the-referencemanyfield-`
        );
      }
      const key = query.args[0].name;

      return {
        limit: preparedParams.pagination.perPage,
        [key]: preparedParams.id,
      };

    case GET_ONE:
      return { id: preparedParams.id };
    case DELETE:
      return {
        input: { id: preparedParams.id },
      };
    case CREATE:
    case UPDATE: {
      return buildCreateUpdateVariables(introspectionResults)(
        resource,
        aorFetchType,
        preparedParams,
        queryType
      );
    }
  }
};
