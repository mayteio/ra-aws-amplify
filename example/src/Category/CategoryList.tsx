import * as React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { AmplifyPagination } from '../../..';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import { CategoryCreate } from './CategoryCreate';
import { CategoryEdit } from './CategoryEdit';
import { CategoryListActions } from './CategoryListActions';

export const CategoryList: React.FC = (props: any) => {
  const history = useHistory();
  const handleClose = () => history.push('/Category');

  const createMatch = useRouteMatch('/Category/create');
  const editMatch = useRouteMatch('/Category/:id');

  return (
    <>
      <List
        {...props}
        pagination={<AmplifyPagination />}
        actions={<CategoryListActions />}
        title="Categories"
      >
        <Datagrid>
          <TextField source="title" />
          <EditButton />
        </Datagrid>
      </List>
      <Drawer open={Boolean(createMatch)} onClose={handleClose} anchor="right">
        <CategoryCreate onCancel={handleClose} {...props} />
      </Drawer>
      <Drawer open={Boolean(editMatch)} onClose={handleClose} anchor="right">
        <CategoryEdit onCancel={handleClose} {...props} />
      </Drawer>
    </>
  );
};
