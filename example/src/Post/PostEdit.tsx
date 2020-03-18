import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { MediaUploadInput } from '../common';

export const PostEdit: React.FC = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <MediaUploadInput source="image.id" />
        <TextInput source="title" />
        <TextInput source="content" multiline rows={5} />
        {/* <TextInput value={} disabled /> */}
      </SimpleForm>
    </Edit>
  );
};
