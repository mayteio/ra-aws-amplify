import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import { RaAmplifyPagination, S3ImageField } from '../../../';

export const PostList: React.FC = props => (
  <List {...props} pagination={<RaAmplifyPagination />}>
    <Datagrid rowClick="edit">
      <S3ImageField source="image" />
      <TextField source="title" />
    </Datagrid>
  </List>
);
