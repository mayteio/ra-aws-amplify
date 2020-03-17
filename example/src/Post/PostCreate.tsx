import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { S3Input } from '../../../';

export const PostCreate: React.FC = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <S3Input source="image" />
        <TextInput source="title" />
        <TextInput source="content" multiline rows={5} />
        {/* <TextInput value={} disabled /> */}
      </SimpleForm>
    </Create>
  );
};
