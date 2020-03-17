import * as React from 'react';
import {
  Button,
  Datagrid,
  DeleteButton,
  EditButton,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { Link } from 'react-router-dom';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';

import { S3ImageField } from '../../../';

export const PostShow: React.FC<{
  id: string;
}> = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" disabled />
      <TextField source="title" />
      <TextField source="content" />
      <S3ImageField source="image" />
      <ReferenceManyField reference="Comment" target="commentsByPost">
        <Datagrid>
          <TextField source="content" />
          <EditButton />
          <DeleteButton redirect={`/Post/${props.id}/show`} />
        </Datagrid>
      </ReferenceManyField>
      <AddNewCommentButton />
    </SimpleShowLayout>
  </Show>
);

const AddNewCommentButton: React.FC<{ record?: any }> = ({ record }) => (
  <Button
    component={Link}
    to={{
      pathname: '/Comment/create',
      search: '?postId=' + record.id,
    }}
    label="Add a comment"
  >
    <ChatBubbleIcon />
  </Button>
);
