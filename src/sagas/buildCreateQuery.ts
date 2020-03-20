import { CREATE } from 'ra-core';

export const buildCreateQueries = (dataProvider: any) => ({
  connectionType,
  data,
  resource,
  ids,
}: any) => {
  /** Get the id fields of the model connection, that are not the actual id field */
  const idFields = connectionType.fields.filter((f: any) =>
    f.name.match(/(?<!^)id$/i)
  );

  /** Get the field of the model creating the connection */
  const thisModelField = idFields.find((f: any) =>
    f.name.match(new RegExp(resource, 'i'))
  );

  /** Get the field of the connected model */
  const connectionModelField = idFields.find(
    (f: any) => !f.name.match(new RegExp(resource, 'i'))
  );

  const createConnectionRecord = (data: Record<string, string>) =>
    dataProvider(CREATE, connectionType.name, { data });

  return typeof ids === 'string'
    ? /** If it's a string, it's just one connection */
      [
        createConnectionRecord({
          [thisModelField.name]: data.id,
          [connectionModelField.name]: ids,
        }),
      ]
    : /** If it's an array, it's multiple connections */
      ids.map((id: string) =>
        createConnectionRecord({
          [thisModelField.name]: data.id,
          [connectionModelField.name]: id,
        })
      );
};
