import * as React from 'react';
import { EditButton, Toolbar, translate } from 'react-admin';
import { Button } from '@material-ui/core';

export const CategoryEditToolbar = translate(
  ({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
      <EditButton />
      <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
  )
);
