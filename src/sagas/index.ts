import { DataProvider } from 'ra-core';
import { createConnectionsOnCreateModel } from './createConnections';

export const amplifySagas = (dataProvider: DataProvider) => {
  return [createConnectionsOnCreateModel(dataProvider)];
};
