import { CRUD_GET_LIST_SUCCESS } from 'react-admin';

export const nextTokenReducer = (
  previousState = null,
  { type, payload }: any
) => {
  if (type === CRUD_GET_LIST_SUCCESS) {
    return payload.nextToken || null;
  }
  return previousState;
};
