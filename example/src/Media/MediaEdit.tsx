import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { S3ImageInput } from '../../../';

export const MediaEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <S3ImageInput source="attachment" />
      </SimpleForm>
    </Edit>
  );
};
