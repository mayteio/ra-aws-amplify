import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import { S3ImageField, AmplifyPagination } from '../../../';
import { useSelector } from 'react-redux';

export const MediaList: React.FC = props => {
  const nextTokens = useSelector<any>(state => state.nextTokens);

  return (
    <List {...props} pagination={<AmplifyPagination />} filter={{ nextTokens }}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <S3ImageField source="attachment" />
      </Datagrid>
    </List>
  );
};
