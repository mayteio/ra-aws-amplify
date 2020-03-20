import * as React from 'react';
import { SaveButton, Toolbar, translate } from 'react-admin';
import { Button } from '@material-ui/core';

export const CategoryCreateToolbar = translate(
  ({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
      <SaveButton />
      <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
  )
);
