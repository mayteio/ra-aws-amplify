import { CRUD_CREATE_SUCCESS } from 'ra-core';
import { takeEvery } from 'redux-saga/effects';
import { buildCreateQueries } from './buildCreateQuery';

export const createConnectionsOnCreateModel = (dataProvider: any) => {
  return function* onCreateConnectModels() {
    yield takeEvery(CRUD_CREATE_SUCCESS, function* checkAndCreateConnections({
      payload,
      requestPayload,
      meta,
    }: any) {
      /** Build an array of create mutations */
      yield Promise.all(
        /** Reduce the parameters to get only connected ones */
        Object.entries(requestPayload.data).reduce(
          (acc, [key, ids]: any): any => {
            /** connectionModels get passed to the response by the getResponseParser. */
            const matchedConnectionModel = payload.connectionModels.find(
              (m: any) => m.name === key
            );

            /** If there's a parameter that matches a connection  */
            if (matchedConnectionModel) {
              const requests = buildCreateQueries(dataProvider)({
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
    });
  };
};
