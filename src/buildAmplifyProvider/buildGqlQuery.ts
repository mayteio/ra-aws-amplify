import { IntrospectionResultData } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { GET_LIST, GET_ONE, GET_MANY, CREATE, UPDATE, DELETE } from 'ra-core';

/**
 * Curried in case we want introspection results
 */
export const getGqlQuery = (_: IntrospectionResultData) => (
  raFetchType: string,
  resource: any,
  queries: any,
  mutations: any
) => {
  switch (raFetchType) {
    case GET_LIST:
      return gql(queries[`list${resource.type.name}s`]);
    case GET_ONE:
      return gql(queries[`get${resource.type.name}`]);
    case GET_MANY:
      return gql(queries[`list${resource.type.name}s`]);
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
