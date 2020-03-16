import * as React from 'react';
import {
  Admin,
  Resource,
  ListGuesser,
  UpdateGuesser,
  ShowGuesser,
} from 'react-admin';
import { buildDataProvider, defaultDataProvider } from './dataProvider';
import { useAuthProvider, useUser, nextTokenReducer } from '../../';
import { PostList } from './Post';

export const App = () => {
  const [dataProvider, setDataProvider] = React.useState(defaultDataProvider);

  const authProvider = useAuthProvider();
  const user = useUser();

  React.useEffect(() => {
    user &&
      buildDataProvider().then(dataProvider =>
        setDataProvider(() => dataProvider)
      );
  }, [user]);

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
          // show={ShowGuesser}
          // create={UpdateGuesser}
          // update={UpdateGuesser}
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
