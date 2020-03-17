import React from 'react';
import { Show, SimpleShowLayout, TextField, ReferenceField } from 'react-admin';

export const CommentShow: React.FC = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="content" />
        <ReferenceField source="postId" reference="Post">
          <TextField source="title" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};
