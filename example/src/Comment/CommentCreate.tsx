import * as React from 'react';
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from 'react-admin';
import { useLocation } from 'react-router-dom';

export const CommentCreate: React.FC = props => {
  const location = useLocation();
  const postId = new URLSearchParams(location.search).get('postId');

  return (
    <Create {...props}>
      <SimpleForm
        defaultValue={{ postId }}
        redirect={postId ? `/Post/${postId}/show` : 'show'}
      >
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
    </Create>
  );
};
