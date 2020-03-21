import { DataProvider } from 'ra-core';
import { buildConnectionsSagas } from './checkConnections';

export const amplifySagas = (dataProvider: DataProvider) => {
  return [buildConnectionsSagas(dataProvider)];
};
