import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import { S3ImageField, RaAmplifyPagination } from '../../../';

export const MediaList: React.FC = props => {
  return (
    <List {...props} pagination={<RaAmplifyPagination />}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <S3ImageField source="attachment" />
      </Datagrid>
    </List>
  );
};
