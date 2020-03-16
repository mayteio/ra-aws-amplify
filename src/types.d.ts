import { AuthOptions } from 'aws-appsync-auth-link';
import { IntrospectionResultData } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

export interface buildQueryFactoryOpts {
  queries: Record<string, string>;
  mutations: Record<string, string>;
}

export interface createClientOpts {
  schema: IntrospectionResultData;
  endpoint: string;
  auth: {
    url: string;
    region: string;
    auth: AuthOptions;
    complexObjectsCredentials: any;
  };
}
