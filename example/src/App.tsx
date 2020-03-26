import * as React from 'react';
import { Admin } from 'react-admin';
import { useAmplifyDataProvider, useAuthProvider, reducers } from '../../';

// things for the dataProvider
import config from './aws-exports';
import schema from './graphql/schema.json';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

// Resources
import { Resource } from 'react-admin';
import { PostList, PostCreate, PostShow, PostEdit, PostIcon } from './Post';
import {
  CommentList,
  CommentCreate,
  CommentShow,
  CommentEdit,
  CommentIcon,
} from './Comment';
import { MediaList, MediaShow, MediaEdit, MediaIcon } from './Media';

export const App = () => {
  const dataProvider = useAmplifyDataProvider({
    config,
    schema,
    queries,
    mutations,
  });
  const authProvider = useAuthProvider();

  return dataProvider ? (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      customReducers={reducers}
    >
      <Resource
        name="Post"
        list={PostList}
        show={PostShow}
        create={PostCreate}
        edit={PostEdit}
        icon={PostIcon}
      />
      <Resource
        name="Comment"
        list={CommentList}
        show={CommentShow}
        create={CommentCreate}
        edit={CommentEdit}
        icon={CommentIcon}
      />
      <Resource
        edit={MediaEdit}
        list={MediaList}
        show={MediaShow}
        name="Media"
        icon={MediaIcon}
      />
    </Admin>
  ) : (
    <>Loading...</>
  );
};
