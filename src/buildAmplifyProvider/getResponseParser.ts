import { GET_LIST, GET_MANY_REFERENCE } from 'ra-core';
import getFinalType from './getFinalType';

export const LARGE_TOTAL = 9999;

const sanitizeResource = (introspectionResults: any) => (data: any) => {
  const sanitize = sanitizeResource(introspectionResults);
  const result: any = Object.keys(data).reduce((acc, key) => {
    let dataKey = data[key];
    if (key.startsWith('_') || dataKey === null || dataKey === undefined) {
      return acc;
    }

    if (
      !Array.isArray(dataKey) &&
      dataKey !== null &&
      dataKey.hasOwnProperty('items')
    ) {
      dataKey = dataKey.items;
    }

    if (Array.isArray(dataKey)) {
      if (typeof dataKey[0] === 'object') {
        return {
          ...acc,
          [key]: dataKey.map(sanitize),
          [`${key}Ids`]: dataKey.map(d => d.id),
        };
      } else {
        return { ...acc, [key]: dataKey };
      }
    }

    if (typeof dataKey === 'object') {
      return {
        ...acc,
        ...(dataKey &&
          dataKey.id && {
            [`${key}.id`]: dataKey.id,
          }),
        [key]: sanitize(dataKey),
      };
    }

    return { ...acc, [key]: dataKey };
  }, {});

  return result;
};

export const getResponseParser = (introspectionResults: any) => (
  aorFetchType: string,
  resource: any,
  queryType: any,
  params: any
) => ({ data }: any) => {
  /** Get connections for creating linked models after CREATE and UPDATE */
  const connectionModels = resource.type.fields.reduce((acc: any, f: any) => {
    const type = getFinalType(f.type);
    if (type.name.match(/connection/i)) {
      const connectionModel = introspectionResults.types.find((t: any) =>
        type.name.includes(t.name)
      );
      return [...acc, connectionModel];
    }

    return acc;
  }, []);

  const sanitize = sanitizeResource(introspectionResults);

  if (aorFetchType === GET_LIST) {
    return {
      data: data[`list${resource.type.name}s`].items.map(sanitize),
      nextToken: data[`list${resource.type.name}s`].nextToken,
      query: queryType.name,
      total: LARGE_TOTAL,
    };
  }

  if (aorFetchType === GET_MANY_REFERENCE) {
    return {
      data:
        data[params.target] && data[params.target].items.map(sanitizeResource),
      nextToken: data[params.target].nextToken,
      query: queryType.name,
      total: LARGE_TOTAL,
    };
  }

  return {
    data: data[queryType.name] && sanitizeResource(data[queryType.name]),
    connectionModels,
    total: LARGE_TOTAL,
  };
};

export default getResponseParser;
