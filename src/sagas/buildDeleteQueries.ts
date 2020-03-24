import { DELETE_MANY, GET_MANY_REFERENCE } from 'ra-core';

export const buildDeleteQueries = (dataProvider: any) => ({
  connectionType,
  data,
  resource,
}: // _ids,
any): Promise<any>[] => {
  const connectionModelCamelCase =
    connectionType.name.charAt(0).toLowerCase() + connectionType.name.slice(1);

  // Build promise of deleted connections
  const deleteConnections = dataProvider(
    GET_MANY_REFERENCE,
    connectionType.name,
    {
      target: `${connectionModelCamelCase}by${resource}`,
      data: {
        id: data.id,
      },
    }
  ).then((connectionsToDelete: any) => {
    console.log(
      connectionsToDelete,
      connectionsToDelete.map((connection: any) => connection.id)
    );
    return dataProvider(DELETE_MANY, connectionType.name, {
      ids: connectionsToDelete.map((connection: any) => connection.id),
    });
  });

  return [deleteConnections];
};
