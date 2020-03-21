export const buildUpdateQueries = (dataProvider: any) => ({
  connectionType,
  data,
  meta,
  ids,
}: any) => {
  console.log(connectionType, data, meta, ids, dataProvider);
  return [Promise.resolve()];
};
