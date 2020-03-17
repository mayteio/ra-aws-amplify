import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { S3Input } from '../../../';

export const PostEdit: React.FC = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <S3Input source="image" />
        <TextInput source="title" />
        <TextInput source="content" multiline rows={5} />
        {/* <TextInput value={} disabled /> */}
      </SimpleForm>
    </Edit>
  );
};
