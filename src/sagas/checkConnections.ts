import { buildCreateQueries } from './buildCreateQuery';
// import { buildUpdateQueries } from './buildUpdateQueries';
import {
  CREATE,
  // UPDATE,
  CRUD_CREATE_SUCCESS,
  CRUD_UPDATE_SUCCESS,
  CRUD_DELETE_SUCCESS,
} from 'ra-core';
import { takeEvery } from 'redux-saga/effects';

export const buildConnectionsSagas = (dataProvider: any) => {
  return function* connectionSagas() {
    yield takeEvery(
      [CRUD_CREATE_SUCCESS, CRUD_UPDATE_SUCCESS, CRUD_DELETE_SUCCESS],
      function* checkConnections({ payload, requestPayload, meta }: any) {
        console.log(payload, requestPayload, meta);

        yield Promise.all(
          Object.entries<[string]>(requestPayload.data).reduce(
            (
              acc: Promise<any>[],
              [key, ids]: [string, string[]]
            ): Promise<any>[] => {
              /** connectionModels get passed to the response by the getResponseParser. */
              const matchedConnectionModel = payload.connectionModels.find(
                (m: any) => m.name === key
              );

              /** If there's a matched connection for this data field, attempt to build queries based on the query type  */
              const queriesMap: Record<
                string,
                (data: any) => Promise<any>[]
              > = {
                [CREATE]: buildCreateQueries(dataProvider),
                // [UPDATE]: buildUpdateQueries(dataProvider),
                // [DELETE]: buildDeleteQueries(dataProvider),
              };

              if (matchedConnectionModel) {
                const requests = queriesMap[meta.fetchResponse]({
                  connectionType: matchedConnectionModel,
                  resource: meta.resource,
                  data: payload.data,
                  ids,
                });

                return [...acc, ...requests];
              }

              return acc;
            },
            []
          )
        );
      }
    );
  };
};
