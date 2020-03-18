import * as React from 'react';
import {
  Show,
  TextField,
  SimpleShowLayout,
  DeleteButton,
  TopToolbar,
} from 'react-admin';
import { S3ImageField } from '../../../';

export const MediaShow = props => {
  console.log('running');

  return (
    <Show
      {...props}
      actions={
        <TopToolbar>
          <DeleteButton />
        </TopToolbar>
      }
    >
      <SimpleShowLayout>
        <S3ImageField source="attachment" />
        <TextField source="name" />
      </SimpleShowLayout>
    </Show>
  );
};
