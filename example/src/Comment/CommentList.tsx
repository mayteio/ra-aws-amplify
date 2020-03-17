import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import { RaAmplifyPagination } from '../../..';

export const CommentList: React.FC = props => {
  return (
    <List {...props} pagination={<RaAmplifyPagination />}>
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
