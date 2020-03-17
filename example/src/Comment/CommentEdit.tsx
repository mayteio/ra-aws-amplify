import * as React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from 'react-admin';

export const CommentEdit: React.FC = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="postId"
          reference="Post"
          allowEmpty
          validate={required()}
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="content" multiline rows={5} />
      </SimpleForm>
    </Edit>
  );
};
