import * as React from 'react';
import { Create, TextInput, SimpleForm, required } from 'react-admin';
import { Typography } from '@material-ui/core';
import { CategoryCreateToolbar } from './CategoryCreateToolbar';

export const CategoryCreate: React.FC<any> = ({ onCancel, ...props }) => {
  return (
    <Create {...props} title=" ">
      <SimpleForm toolbar={<CategoryCreateToolbar onCancel={onCancel} />}>
        <Typography variant="h6">Create category</Typography>
        <TextInput source="title" validate={required()} />
      </SimpleForm>
    </Create>
  );
};
