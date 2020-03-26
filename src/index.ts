export * from './buildAmplifyProvider';
export * from './AmplifyPagination';
export * from './AmplifyAuthProvider';

export * from './fields';
export * from './inputs';

import { nextTokenReducer } from './AmplifyPagination';
export const reducers = {
  nextToken: nextTokenReducer,
};
