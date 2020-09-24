/**
 * Ensure we get the real type even if the root type is NON_NULL or LIST
 * @param {GraphQLType} type
 */
declare const getFinalType: (type: any) => any;
export default getFinalType;
