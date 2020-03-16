import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { S3Input } from '../../../src/S3Input';

export const PostCreate: React.FC = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <S3Input source="image.attachment" />
        <TextInput source="title" />
        <TextInput source="content" multiline />
        {/* <TextInput value={} disabled /> */}
      </SimpleForm>
    </Create>
  );
};
