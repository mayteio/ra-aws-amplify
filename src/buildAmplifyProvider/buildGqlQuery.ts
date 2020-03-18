import gql from 'graphql-tag';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';
export const getGqlQuery = (_introspectionResults: any) => (
  raFetchType: string,
  resource: any,
  params: any,
  queries: any,
  mutations: any
) => {
  switch (raFetchType) {
    case GET_LIST:
      return gql(queries[`list${resource.type.name}s`]);
    case GET_ONE:
      return gql(queries[`get${resource.type.name}`]);
    case GET_MANY_REFERENCE:
      const targetQuery = params.target;
      return gql(queries[targetQuery]);
    case CREATE:
      return gql(mutations[`create${resource.type.name}`]);
    case UPDATE:
      return gql(mutations[`update${resource.type.name}`]);
    case DELETE:
      return gql(mutations[`delete${resource.type.name}`]);
    default:
      return undefined;
  }
};
