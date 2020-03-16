import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import { RaAmplifyPagination } from '../../../';

export const PostList: React.FC = props => (
  <List {...props} pagination={<RaAmplifyPagination />}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="owner" />
    </Datagrid>
  </List>
);
