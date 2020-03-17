import * as React from 'react';
import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
  ListGuesser,
} from 'react-admin';
import { buildDataProvider, defaultDataProvider } from './dataProvider';
import { useRaAuthProvider, useUser, nextTokenReducer } from '../../';
import { PostList, PostCreate, PostShow, PostEdit, PostIcon } from './Post';
import {
  CommentList,
  CommentCreate,
  CommentShow,
  CommentEdit,
  CommentIcon,
} from './Comment';

export const App = () => {
  // Pass a freshly minted dataProvider when a user object becomes available (meaning we have a JWT)
  const [dataProvider, setDataProvider] = React.useState(defaultDataProvider);
  const user = useUser();
  React.useEffect(() => {
    user &&
      buildDataProvider().then(dataProvider =>
        setDataProvider(() => dataProvider)
      );
  }, [user]);

  // get authProvider for <Admin /> component.
  const authProvider = useRaAuthProvider();

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      customReducers={{ nextToken: nextTokenReducer }}
    >
      {permissions => [
        <Resource
          name="Post"
          list={PostList}
          show={PostShow}
          create={PostCreate}
          edit={PostEdit}
          icon={PostIcon}
        />,
        <Resource
          name="Comment"
          list={CommentList}
          show={CommentShow}
          create={CommentCreate}
          edit={CommentEdit}
          icon={CommentIcon}
        />,
        // permissions.groups.includes('admin') ? (
        //   <Resource
        //     name="User"
        //     list={ListGuesser}
        //     show={ShowGuesser}
        //     create={UpdateGuesser}
        //     update={UpdateGuesser}
        //   />
        // ) : null,
      ]}
    </Admin>
  );
};
