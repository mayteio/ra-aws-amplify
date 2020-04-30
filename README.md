# `ra-aws-amplify`

🚨 Work in progress. Use in production at your own risk! We are 🤓
Feel free to [contribute](https://github.com/mayteio/ra-aws-amplify/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) though to get it there though. I love contributors.

> Easily bootstrap an admin interface for your [AWS Amplify](https://aws-amplify.github.io/docs/js/start?platform=purejs) Apps that use a GraphQL `API`, `Storage` and `Auth`.

## Why?

AWS Amplify is a great tool for generating cross-platform apps that string together AWS resources like AppSync for GraphQL, Cognito for user management and S3 for file storage, among other things.

One of the promises of AWS Amplify is _Focus on the features, not the back-end_. This stops short of providing an easy-to-use back-end for managing content - unless you're fine digging around DynamoDB, S3 and so on. Enter [`react-admin`](https://github.com/marmelab/react-admin) with `ra-aws-amplify`.

![Screenshot of working app](https://user-images.githubusercontent.com/43975092/77123217-9a51a480-6a93-11ea-8e7e-a6acf636bc46.png)
_Screenshot of the example app in this package, using `Auth`, GraphQL `API` and `Storage`._

## What's in this package?

- [Installation](#installation)
- [Usage](#usage)
- [`useAmplifyDataProvider`](#useamplifydataprovider)
- [DynamoDB Access Patterns with `react-admin`](#dynamodb-access-patterns-with-react-admin)
  - [A product with an image](#a-product-with-an-image)
  - [A post with comments](#a-post-with-comments-using-the-referencemanyfield-)
  - [Post editors](#post-editors)
  - [Filter and sort media by name](#filter-and-sort-media-by-name)
- [Authentication and Sign in with `Auth`](#signin-with-auth)
  - [`<AmplifyAuthProvider />`](#amplifyauthprovider-)
  - [`useAuth`](#useauth)
  - [`useAuthProvider`](#useauthprovider)
  - [`useUser`](#useuser)
  - [Federated sign in](#federated-sign-in)
  - [Permissions](#permissions)
- [Image Upload with `Storage`](#image-upload)
  - [Required schema](#required-schema)
  - [`<S3ImageInput />` and `<S3FileInput />`](#s3imageinput--and-s3fileinput-)
  - [`<S3ImageField />` and `<S3FileField />`](#s3imagefield--and-s3filefield-)
  - [`<S3Input />` and `<S3Field />`](#s3input--and-s3field-)
  - [`protected`, `private` files](#protected-private-files)
- [Pagination using `nextToken`](#pagination-using-nexttoken)

## Whats missing and needs help?

- Your knowledge and ideas
- Proper typescript typing
- Jest tests
- handling many to many connections
- Filtering, sorting of get & list
- Search with `@searchable` directive
- REST API support

[Check out some `good first issues`](https://github.com/mayteio/ra-aws-amplify/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to start!

## Installation

```bash
$ yarn add ra-aws-amplify@alpha react-admin aws-amplify
```

## Usage

Example schema:

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
}
```

```javascript
// App.js
import React, { useEffect, useState } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { useAmplifyDataProvider } from 'ra-aws-amplify';

// grab your amplify generated code
import config from './aws-exports';
import schema from './graphql/schema.json';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

function App() {
  const dataProvider = useAmplifyDataProvider({ config, schema, queries, mutations });

  return
    <Admin dataProvider={dataProvider}>
      <Resource name="Post" list={ListGuesser} />
    </Admin>
  )
}

export default App;
```

## `useAmplifyDataProvider`

`useAmplifyDataProvider` is a hook that generates a dataProvider to pass into the `<Admin />` component from `react-admin`. It's smart enough to pick up what kind of authentication you're using for your API (based on the config you pass) as well as hook up the generated queries and mutations from running `amplify push`.

```js
import { AUTH_TYPE } from 'aws-appsync';
import { useAmplifyDataProvider } from 'react-admin';

import config from './aws-exports';
import schema from './graphql/schema.json';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

const dataProvider = useAmplifyDataProvider({
  // required
  config, // generated aws-exports.js
  schema, // generated json schema.json
  queries, // generated queries.js
  mutations // mutations generated.js
  // optional
  authType: AUTH_TYPE.API_KEY // specify an authType that config doesn't
})
```

## I want use custom queries

No problem. When you `import * as queries from './graphql/queries';` it just returns an object of named queries. You can create your own, ensuring the names and parameters match those of the generated queries, i.e.;

```js
// customQueries.js
export const customQueries = {
  listPosts: `
    query CustomListPostQuery {
      listPosts {
        items {
          id
          title
        }
      }
    }
  `,
};

// App.js
import * as queries from './graphql/queries';
import { customQueries } from './customQueries';

const dataProvider = useAmplifyDataProvider({
  queries: {
    ...queries,
    ...customQueries,
  },
});
```

## DynamoDB Access Patterns with `react-admin`

Coming with DynamoDB's powerful speed and scaling features are (often painful) rigidity problems with access patterns. You need to consider access patterns for your front-end **and** your back-end when writing your schema. In general, favour flexible relationships over simpler ones, i.e. `belongs to` over `has one`. This is especially relevant when you want to filter or sort. In some cases, it's easier (though more expen\$ive) to use the `@searchable` directive.

Here are a few scenarios.

- [A product with an image](#a-product-with-an-image)
- [A post with comments](#a-post-with-comments-using-the-referencemanyfield)
- [Post editors](#post-editors)
- [Filter and sort media by name](#filter-and-sort-media-by-name)

### A product with an image

> See `example/src/Post/PostCreate.tsx`, `example/src/Post/PostEdit.tsx` and `example/src/Media/MediaUploadInput.tsx` for examples.

Given the schema:

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
  image: Media @connection
}

type Media @model {
  id: ID!
  name: String
  attachment: S3Object!
}

# S3Object minimum type
type S3Object {
  key: String!
  identityId: String
  level: String
}
```

Some custom work is still required despite the easy setup touted by `react-admin` to achieve relationships like this. One limitation of DynamoDB is that you can't create records as part of a parent record. In an ideal world, you could pass image input to the post input and the resolvers would generate both records for you. That's not the case here.

Instead, the step is more like;

1. Create image
2. Use image ID to create/update the post

`react-admin` doesn't support sequential creation through the `dataProvider` so you'll have to get creative in your back end. In the example this has been approached with a media popup. The steps look like this instead:

1. Fill out new post form
2. Click "Add media"
3. Open a MUI dialog with a `<CreateMedia />` form in it
4. Use the [`useMutation`](https://marmelab.com/react-admin/Actions.html#usemutation-hook) hook from `react-admin` to create it on the fly
5. On success, close the dialog and set the `postImageId` field (autogenerated, [you can name it if you wish](https://aws-amplify.github.io/docs/cli-toolchain/graphql?sdk=js#usage-2)) via the [`useInput`](https://marmelab.com/react-admin/Inputs.html#useinput-hook) hook from `react-admin`
6. Save the post as you usually would

### A post with comments using the `<ReferenceManyField />`

> See `example/src/Post/PostShow.tsx` and `example/src/Comment/CommentCreate.tsx` for an example

Based off the [React Admin Advanced Recipes: Creating a Record Related to the Current One](https://marmelab.com/blog/2018/07/09/react-admin-tutorials-form-for-related-records.html) tutorial `react-admin`'s model assumes that when using any component or hook that calls a `GET_MANY_REFERENCE`, you can query your model by its connection. DyanmoDB doesn't support this out of the box, so we need to use a `has many` connection with the `@key` directive, specifying a `queryField`. This will generate a query that allows this access pattern.

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
}

type Comment
  @model
  @key(name: "byPost", fields: ["postId"], queryField: "commentsByPost") {
  id: ID!
  content: String
  postId: ID!
}
```

Your generated GraphQL queries will pump out something like this:

```js
export const commentsByPost = /* GraphQL */ `
  query CommentsByPost(
    $postId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postId
      }
      nextToken
    }
  }
`;
```

Under the hood, `ra-aws-amplify` will look to match this query during a `GET_MANY_REFERENCE` call.

Here's an example where we show comments on a post. You **must** set the `target` prop to the `queryField` value in your schema, like so:

```js
// PostsShow.js
export const PostShow = prop => {
  <Show {...props}>
    ...
    <ReferenceManyField
      reference="Comment"
      // target here should match queryField.
      target="commentsByPost"
    >
      <Datagrid>
        <TextField source="content" />
      </Datagrid>
    </ReferenceManyField>
  </Show>;
};
```

The package will pick up on this and wire everything up as expected.

### Post categories (many to many)

Coming soon...

### Filter and sort Media by name

Coming soon...

---

## Authentication and Sign in with `Auth`

This package exposes a few tools for handling authentication out of the box with `@aws-amplify/Auth`:

- [`<AmplifyAuthProvider />`](#amplifyauthprovider-)
- [`useAuth`](#useauth)
- [`useAuthProvider`](#useauthprovider)
- [`useUser`](#useuser)
- [Federated sign in](#federated-sign-in)
- [Permissions](#permissions)

### `<AmplifyAuthProvider />`

Wrap your app in this provider so `Auth` is available at all contexts, with an abstracted API so it's easier to refactor to another provider if DynamoDB drives you nuts 😉.

```js
// index.tsx
import ReactDOM from 'react-dom';
import { AmplifyAuthProvider } from 'ra-aws-amplify';
import { App } from './App';

ReactDOM.render(
  <AmplifyAuthProvider>
    <App />
  </AmplifyAuthProvider>,
  document.getElementById('root')
);
```

This context provider is used by the following hooks.

### `useAuth()`

Just provides direct access to the aws amplify `Auth` class via a hook.

```js
import { useAuth } from 'ra-aws-amplify';
...
const auth = useAuth();
// https://aws-amplify.github.io/docs/js/authentication#sign-up
auth.signUp({username, password}).then(...);
```

This has been included to encourage flexibility. In the future, should you switch to say, Azure, you can build a hook called `useAuth` that exposes the methods you use (i.e. signUp, signOut) and do a relatively small refactor on your front end.

## `useAuthProvider()`

`react-admin` has some [login functionality built in](https://marmelab.com/react-admin/Authentication.html) that we can tap into. This hook does just that and integrates `Auth` with `react-admin` out of the box.

```js
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { useAuthProvider } from 'ra-aws-amplify';

export const App = () => {
  const authProvider = useAuthProvider();
  return (
    <Admin authProvider={authProvider} dataProvider={...}>
      <Resource name="Post" list={ListGuesser} />
    </Admin>
  );
};
```

## `useUser()`

Listening for Amplify Hub events is a pain in the ass, so, at least for login, this package does that for you. Internally, it listens to the Hub and 'hookifies' the user object, so you don't have to worry about promises.

This returns `undefined` when not signed in, and the result of [`Auth.currentAuthenticatedUser`](https://aws-amplify.github.io/docs/js/authentication#retrieve-current-authenticated-user) when successfully authenticated.

```js
import { useUser } from 'ra-aws-amplify';
...
const user = useUser();
const auth = useAuth();
auth.changePassword(user, ...);
```

### Federated Sign-in

You'll have to create a custom `LoginPage` for federated sign in to work. You can use the [`useLogin` hook](https://marmelab.com/react-admin/Authentication.html#customizing-the-login-and-logout-components) exposed by `react-admin` to access the login method inside the `authProvider` from this package. It'll automatically popup sign-in windows when you pass in the a `provider` property, i.e.

```js
const login = useLogin();
login({ provider: 'google' });
```

For a complete example, your Login components might look like this:

```js
import React from 'react';
import { Login, useLogin } from 'react-admin';
import { Button } from '@material-ui/core';

// <LoginForm />
const LoginForm = () => {
  const login = useLogin();
  const handleLogin = () => login({ federated: true, provider: 'google' });
  return <Button onClick={handleLogin}>Login with Google</Button>;
};

// <LoginPage />
const LoginPage = props => <Login {...props} loginForm={<LoginForm />} />;

// <App />
const App = () => {
  const authProvider = useAuthProvider();
  return <Admin authProvider={authProvider} loginPage={LoginPage} />;
};
```

### Permissions

`react-admin` has tools for [dealing with permissions](https://marmelab.com/react-admin/Authorization.html). By using the `authProvider` from this package, you automatically get [id token claims]() passed in for use via the `usePermissions` hook:

```js
import { usePermissions } from 'react-admin';

const { permissions } = usePermissions();
console.log(permissions.claims['cognito:groups']); // => ['admin', 'user']
```

You can then use these in your `Resource`, `List`, `Show`, `Create`, `Edit` components. See the [`react-admin` Authorization docs](https://marmelab.com/react-admin/Authorization.html) for use cases.

Use this in conjunction with the [Pre Token Generation Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-token-generation.html) for even more fine-grained access control.

---

## Image Upload with `Storage`

This package exposes a handful of input and field components to help you deal with image & file upload via aws-amplify's `Storage` package.

- [Required schema](#required-schema)
- [`<S3ImageInput />` and `<S3FileInput />`](#s3imageinput--and-s3fileinput-)
- [`<S3ImageField />` and `<S3FileField />`](#s3imagefield--and-s3filefield-)
- [`<S3Input />` and `<S3Field />`](#s3input--and-s3field-)
- [`protected`, `private` files](#protected-private-files)

### Required Schema

Your schema must include an `S3Object` type where you want your file upload to be:

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
  featureImage: S3Object
  files: [S3Object!]
}

type S3Object {
  key: String!
  identityId: String
  level: String
  type: String!
}
```

### `<S3ImageInput />` and `<S3FileInput />`

You can then use `<S3ImageInput />` and `<S3FileInput />` to upload files. Your `<CreatePost />` might look something like the following:

```js
// CreatePost.js
import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { S3ImageInput, S3FileInput } from 'ra-aws-amplify';

export const CreateApp: React.FC = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="content" multiline />
        <S3ImageInput source="featureImage" accept="image/*" multiple={false} />
        <S3FileInput source="files" multiple={true} />
      </SimpleForm>
    </Create>
  );
};
```

### `<S3ImageField />` and `<S3FileField />`

If you want to use the image and files in your `<List />` component, you can use the `<S3ImageField />` and `<S3FileField />` to display them:

```js
import React from 'react';
import { List, Datagrid, TextField, SingleFieldList } from 'react-admin';
import { S3ImageField, S3FileField } from 'ra-aws-amplify';

export const ListPosts = props => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <S3ImageField source="featureImage" />
        <ArrayField source="files">
          <SingleFieldList>
            <S3FileField />
          </SingleFieldList>
        </ArrayField>
        <TextField source="title" />
        <TextField source="content" />
      </Datagrid>
    </List>
  );
};
```

### `<S3Input />` and `<S3Field />`

The logic for handling `Storage` upload & retrieval is actually abstracted into these two components. They both use `React.cloneElement` to pass the props down to either `S3ImageField` or `S3FileField`. The responsibility of, for example, S3ImageField is just to display whatever URL is passed down to it.

### `protected`, `private` files

You can pass in the `level` option as a prop to `<S3Input level={...} />` (one of `public`, `protected`, and `private`) and that will get passed on to `Storage`. If you do this, it's important to either use the `authProvider` from this package, or in your custom `authProvider` pass the `identityId` into `getPermissions`:

```js
export const authProvider = {
  ...
  getPermissions: () =>
    Promise.all([
      Auth.currentCredentials(),
      Auth.currentAuthenticatedUser(),
    ]).then(([{ identityId }, use]) => ({
      identityId,
      // this allows you to check which groups the user is in too! Booya, bonus.
      groups: user.signInUserSession.accessToken.payload['cognito:groups'],
    })),
}
```

If you set the level to either `private` or `protected` the `<S3Input />` component will automatically attach both level and identityId to the record under the hood, required for access later.

---

## Pagination using `nextToken`

### 🚨 INCOMPLETE!

Pagination doesn't work just yet. [See this issue, please help out!](https://github.com/mayteio/ra-aws-amplify/issues/11)

This package also exports some reducers and components for handling pagination specific to dynamodb - which has no concept of totals or pages. This library utilises custom reducers to catch the `nextToken` and use it in subsequent `GET_LIST` calls.

1. Pass in the custom reducers from this package
2. Pass in the `<AmplifyPagination />` component to your `<List />`
3. Pass in the `nextToken` as a filter to your `<List />`

```js
// App.js
import { reducers } from 'ra-aws-amplify';
import { PostsList } from './PostsList';
...

export const App = () => (
  <Admin ... customReducers={reducers}>
    <Resource name="Post" list={PostsList}>
  </Admin>
)

// PostsList.js
import { List, ... } from 'react-admin';
import { AmplifyPagination } from 'ra-aws-amplify';
import { useSelector } from 'react-redux';

export const PostsList = props => {
  const nextToken = useSelector(state => state.nextToken);
  return (
    <List {...props} pagination={<AmplifyPagination />} filter={{nextToken}}>
      ...
    </List>
  )
}
```

The `dataProvider` handles the rest for you.

## Contributing

Have you learnt something interesting about integrating `react-admin` with AWS Amplify on a private project? Open source only works because people like you help people like me create awesome things and share our knowledge. Any help with this package is much appreciated, whether it's knowledge, tests, improving types, additional components, optimisations, solutions, etc. Just create an issue and let's get started!

Read contribution guidelines.

## License

[MIT]()
