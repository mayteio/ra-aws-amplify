import { AUTH_TYPE } from 'aws-appsync-auth-link';
interface useDataProviderArgs {
    config: Record<string, any>;
    authType?: AUTH_TYPE | undefined;
    queries: any;
    mutations: any;
    schema: any;
}
export declare function useAmplifyDataProvider({ config, schema, queries, mutations, authType, }: useDataProviderArgs): any;
export {};
