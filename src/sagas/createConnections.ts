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
          (acc, [key, value]: any): any => {
            /** connectionModels get passed to the response by the getResponseParser. */
            const matchedConnectionModel = payload.connectionModels.find(
              (m: any) => m.name === key
            );

            /** If there's a parameter that matches a connection  */
            if (matchedConnectionModel) {
              /**
               * Get the id fields of the model connection, that are not the actual id field */
              const idFields = matchedConnectionModel.fields.filter((f: any) =>
                f.name.match(/(?<!^)id$/i)
              );

              /** Get the field of the model creating the connection */
              const thisModelField = idFields.find((f: any) =>
                f.name.match(new RegExp(meta.resource, 'i'))
              );

              /** Get the field of the connected model */
              const connectionModelField = idFields.find(
                (f: any) => !f.name.match(new RegExp(meta.resource, 'i'))
              );

              const createConnectionRecord = (data: Record<string, string>) =>
                dataProvider(CREATE, matchedConnectionModel.name, { data });

              /** Create an array  */
              const requests =
                typeof value === 'string'
                  ? /** If it's a string, it's just one connection */
                    [
                      createConnectionRecord({
                        [thisModelField.name]: payload.data.id,
                        [connectionModelField.name]: value,
                      }),
                    ]
                  : /** If it's an array, it's multiple connections */
                    value.map((id: string) =>
                      createConnectionRecord({
                        [thisModelField.name]: payload.data.id,
                        [connectionModelField.name]: id,
                      })
                    );

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
