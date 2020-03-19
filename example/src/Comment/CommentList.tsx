import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import { AmplifyPagination } from '../../..';

export const CommentList: React.FC = props => {
  return (
    <List {...props} pagination={<AmplifyPagination />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="content" />
        <ReferenceField source="postId" reference="Post">
          <TextField source="title" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
