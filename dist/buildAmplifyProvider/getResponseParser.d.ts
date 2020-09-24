export declare const LARGE_TOTAL = 9999;
declare const _default: (_introspectionResults: any) => (aorFetchType: string, resource: any, queryType: any, params: any) => (response: any) => {
    data: any;
    nextToken: any;
    total: number;
} | {
    data: any;
    total: number;
    nextToken?: undefined;
};
export default _default;
