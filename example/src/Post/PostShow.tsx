import * as React from 'react';
import {
  Button,
  Datagrid,
  DeleteButton,
  EditButton,
  ReferenceField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { Link } from 'react-router-dom';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';

import { S3ImageField } from '../../../';

/**
 * 1. preview of image with edit button
 * 2. edit opens a popup to upload a file, create media
 * 3. on save saves the ID to the post
 */

export const PostShow: React.FC<{
  id: string;
}> = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" disabled />
      <TextField source="title" />
      <TextField source="content" />
      <ReferenceField
        label="Featured image"
        source="image.id"
        reference="Media"
      >
        <S3ImageField
          source="attachment"
          style={{ width: 100, height: 'auto' }}
        />
      </ReferenceField>
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
