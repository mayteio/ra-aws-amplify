import { GET_LIST, GET_MANY_REFERENCE } from 'ra-core';

export const LARGE_TOTAL = 9999;

const sanitizeResource = (data: any) => {
  const result: any = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith('_')) {
      return acc;
    }

    const dataKey = data[key];

    if (dataKey === null || dataKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataKey)) {
      if (typeof dataKey[0] === 'object') {
        return {
          ...acc,
          [key]: dataKey.map(sanitizeResource),
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
        [key]: sanitizeResource(dataKey),
      };
    }

    return { ...acc, [key]: dataKey };
  }, {});

  return result;
};

export default (_introspectionResults: any) => (
  aorFetchType: string,
  resource: any,
  queryType: any,
  params: any
) => (response: any) => {
  const data = response.data;
  if (aorFetchType === GET_LIST) {
    return {
      data: data[`list${resource.type.name}s`].items.map(sanitizeResource),
      nextToken: data[`list${resource.type.name}s`].nextToken,
      total: LARGE_TOTAL,
    };
  }

  if (aorFetchType === GET_MANY_REFERENCE) {
    return {
      data:
        data[params.target] && data[params.target].items.map(sanitizeResource),
      nextToken: data[params.target].nextToken,
      total: LARGE_TOTAL,
    };
  }

  return {
    data: data[queryType.name] && sanitizeResource(data[queryType.name]),
    total: LARGE_TOTAL,
  };
};
