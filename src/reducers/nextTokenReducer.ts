import { CRUD_GET_LIST_SUCCESS } from 'react-admin';

export const nextTokenReducer = (
  previousState = {},
  { type, payload }: any
) => {
  // store the crud token when it comes back
  if (type === CRUD_GET_LIST_SUCCESS) {
    return {
      ...previousState,
      [payload.query]: payload.nextToken,
    };
  }

  return previousState;
};
