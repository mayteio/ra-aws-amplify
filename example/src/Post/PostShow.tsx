import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';
import { S3ImageField } from '../../../';

export const PostShow: React.FC = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="content" />
      <S3ImageField source="image" />
    </SimpleShowLayout>
  </Show>
);
