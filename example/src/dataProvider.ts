import { buildAmplifyProvider } from '../../';
import { Auth } from 'aws-amplify';

import config from './aws-exports';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as schema from './graphql/schema.json';

export const buildDataProvider = async () =>
  await buildAmplifyProvider({
    endpoint: config.aws_appsync_graphqlEndpoint,
    schema,
    auth: {
      url: config.aws_appsync_graphqlEndpoint,
      region: config.aws_appsync_region,
      auth: {
        // @ts-ignore
        type: config.aws_appsync_authenticationType,
        credentials: () => Auth.currentCredentials(),
        jwtToken: async () =>
          (await Auth.currentSession()).getAccessToken().getJwtToken(),
      },
    },
    queries,
    mutations,
  });

export const defaultDataProvider = {
  create: () => Promise.resolve({ data: null }), // avoids adding a context in tests
  delete: () => Promise.resolve({ data: null }), // avoids adding a context in tests
  deleteMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
  getList: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
  getMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
  getManyReference: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
  getOne: () => Promise.resolve({ data: null }), // avoids adding a context in tests
  update: () => Promise.resolve({ data: null }), // avoids adding a context in tests
  updateMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
};
