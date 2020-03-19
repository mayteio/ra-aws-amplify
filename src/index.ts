export * from './buildAmplifyProvider';
export * from './AmplifyPagination';
export * from './AmplifyAuthProvider';
export * from './S3ImageField';
export * from './S3Input';

import { nextTokenReducer } from './AmplifyPagination';
export const reducers = {
  nextToken: nextTokenReducer,
};
