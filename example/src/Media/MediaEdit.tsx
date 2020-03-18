import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { S3Input } from '../../../';

export const MediaEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <S3Input source="attachment" />
      </SimpleForm>
    </Edit>
  );
};
