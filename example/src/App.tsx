import * as React from 'react';
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from 'react-admin';
import { buildDataProvider, defaultDataProvider } from './dataProvider';
import { useAuthProvider, useUser, nextTokenReducer } from '../../';
import { PostList, PostCreate } from './Post';

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
  const authProvider = useAuthProvider();

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
          show={ShowGuesser}
          create={PostCreate}
          edit={EditGuesser}
        />,
        // <Resource
        //   name="Comment"
        //   list={ListGuesser}
        //   show={ShowGuesser}
        //   create={UpdateGuesser}
        //   update={UpdateGuesser}
        // />,
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
