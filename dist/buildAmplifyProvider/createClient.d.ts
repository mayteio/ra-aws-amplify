import { ApolloClient } from 'apollo-client';
import { createClientOpts } from '../types';
export declare const createClient: ({ endpoint, auth }: createClientOpts) => ApolloClient<import("apollo-cache-inmemory").NormalizedCacheObject>;
