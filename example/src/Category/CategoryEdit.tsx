import * as React from 'react';
import { Edit, TextInput, SimpleForm, required } from 'react-admin';
import { Typography } from '@material-ui/core';
import { CategoryEditToolbar } from './CategoryEditToolbar';

export const CategoryEdit: React.FC<any> = ({ onCancel, ...props }) => {
  return (
    <Edit {...props} title=" ">
      <SimpleForm toolbar={<CategoryEditToolbar onCancel={onCancel} />}>
        <Typography variant="h6">Edit category</Typography>
        <TextInput source="title" validate={required()} />
      </SimpleForm>
    </Edit>
  );
};
