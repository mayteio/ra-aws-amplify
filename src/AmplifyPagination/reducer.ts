import { CRUD_GET_LIST_SUCCESS } from 'react-admin';

export const nextTokenReducer = (
  previousState = null,
  { type, payload }: any
) => {
  // store the crud token when it comes back
  if (type === CRUD_GET_LIST_SUCCESS) {
    // console.log(payload);

    return payload.nextToken || null;
  }

  // remove the nextToken before trying to get a new list
  // if (type === CRUD_GET_LIST) {
  //   return null;
  // }
  return previousState;
};
