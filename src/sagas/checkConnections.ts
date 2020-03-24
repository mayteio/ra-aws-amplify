import { buildCreateQueries } from './buildCreateQuery';
// import { buildUpdateQueries } from './buildUpdateQueries';
// import { buildDeleteQueries } from './buildDeleteQueries';
import {
  CREATE,
  UPDATE,
  DELETE,
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
        console.log('checking connections', payload, requestPayload, meta);

        if (meta.fetchResponse === CREATE || meta.fetchResponse === UPDATE) {
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
                };
                const query = queriesMap[meta.fetchResponse];

                if (matchedConnectionModel && query) {
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

        if (meta.fetchResponse === DELETE && payload.connectionModels) {
          // const deletedId = payload.data.id;
          // payload.connectionModels.reduce((acc:any, model:any) => {
          //   return acc;
          // }, [])
        }
      }
    );
  };
};
