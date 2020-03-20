import { CREATE, CRUD_CREATE_SUCCESS } from 'ra-core';
import { takeEvery } from 'redux-saga/effects';

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
          (acc: any, [key, ids]: any): any => {
            /** connectionModels get passed to the response by the getResponseParser. */
            const matchedConnectionModel = payload.connectionModels.find(
              (m: any) => m.name === key
            );

            /** If there's a parameter that matches a connection  */
            if (matchedConnectionModel) {
              const connections = ''; // get connections
              /**
               * 1. those that don't exist in connections but do in params - create them
               * 2. those that exist in both params and connections - do nothing
               * 3. those that exist in collections but don't in params - delete the connection
               */
            }
          }
        )
      );
    });
  };
};
