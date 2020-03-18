import gql from 'graphql-tag';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';

import * as t from 'graphql-ast-types-browser';
import { print } from 'graphql/language';

/**
 * Curried in case we want introspection results
 */
export const getGqlQuery = (_introspectionResults: any) => (
  raFetchType: string,
  resource: any,
  params: any,
  queries: any,
  mutations: any
) => {
  console.log(_introspectionResults);

  switch (raFetchType) {
    case GET_LIST:
      return gql(queries[`list${resource.type.name}s`]);
    case GET_ONE:
      return gql(queries[`get${resource.type.name}`]);
    case GET_MANY:
      console.log(resource, _introspectionResults);

      const doc = t.document([
        t.operationDefinition(
          'query',
          /** Create each getModelN(){} definition */
          t.selectionSet(
            params.ids.map((_id: string, i: number) =>
              t.field(
                // operation name
                t.name(`get${resource.type.name}`),
                // operation alias
                t.name(resource.type.name + i),
                // operation arguments
                params.ids.map((_: string, n: number) =>
                  t.argument(t.name('id'), t.variable(t.name(`id${n}`)))
                ),
                null,
                // fields - need to make this dynamic
                t.selectionSet([
                  t.field(t.name('id')),
                  t.field(t.name('name')),
                  t.field(
                    t.name('attachment'),
                    null,
                    null,
                    null,
                    t.selectionSet([t.field(t.name('key'))])
                  ),
                ])
                // t.selectionSet(resource.type.fields.flatMap(
                //   t.field(t.name())
                // ))
              )
            )
          ),
          // give the query a name
          t.name(`GetMany${resource.type.name}sById`),
          // give the query arguments
          params.ids.map((_id2: string, i: number) =>
            t.variableDefinition(
              t.variable(t.name(`id${i}`)),
              t.nonNullType(t.namedType(t.name('ID')))
            )
          )
        ),
      ]);

      console.log(doc, print(doc));
      return doc;
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
