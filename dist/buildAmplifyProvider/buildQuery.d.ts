export declare const buildQueryFactory: (buildVariablesImpl: any, getGqlQuery: any, getResponseParserImpl: any) => ({ queries, mutations }: any) => (introspectionResults: any) => (aorFetchType: string, resourceName: string, params: any) => {
    query: any;
    variables: any;
    parseResponse: any;
};
declare const _default: ({ queries, mutations }: any) => (introspectionResults: any) => (aorFetchType: string, resourceName: string, params: any) => {
    query: any;
    variables: any;
    parseResponse: any;
};
export default _default;
