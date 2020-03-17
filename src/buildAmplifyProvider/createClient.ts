import { createAppSyncLink } from 'aws-appsync';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { createClientOpts } from '../types';

export const createClient = ({ endpoint, auth }: createClientOpts) => {
  // create HTTPLink
  const httpLink = createHttpLink({
    uri: endpoint,
  });

  // create AppSyncLink
  const awsLink = createAppSyncLink(auth);

  const fragmentMatcher: IntrospectionFragmentMatcher = new IntrospectionFragmentMatcher(
    {
      introspectionQueryResultData: {
        __schema: {
          types: [],
        },
      },
    }
  );

  return new ApolloClient({
    link: awsLink.concat(httpLink),
    cache: new InMemoryCache({ fragmentMatcher }),
  });
};
