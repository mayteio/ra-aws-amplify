import buildVariables from './buildVariables';
import { getGqlQuery } from './buildGqlQuery';
import getResponseParser from './getResponseParser';

export const buildQueryFactory = (
  buildVariablesImpl: any,
  getGqlQuery: any,
  getResponseParserImpl: any
) => ({ queries, mutations }: any) => (introspectionResults: any) => {
  const knownResources = introspectionResults.resources.map(
    (r: any) => r.type.name
  );

  return (aorFetchType: string, resourceName: string, params: any) => {
    // console.log(aorFetchType, resourceName, params);
    const resource = introspectionResults.resources.find(
      (r: any) => r.type.name === resourceName
    );

    if (!resource) {
      throw new Error(
        `Unknown resource ${resourceName}. Make sure it has been declared on your server side schema. Known resources are ${knownResources.join(
          ', '
        )}`
      );
    }

    const queryType = resource[aorFetchType];

    if (!queryType) {
      throw new Error(
        `No query or mutation matching fetch type ${aorFetchType} could be found for resource ${resource.type.name}`
      );
    }

    const variables = buildVariablesImpl(introspectionResults)(
      resource,
      aorFetchType,
      params,
      queryType
    );

    const query = getGqlQuery(introspectionResults)(
      aorFetchType,
      resource,
      params,
      queries,
      mutations
    );

    const parseResponse = getResponseParserImpl(introspectionResults)(
      aorFetchType,
      resource,
      queryType,
      params
    );

    return {
      query,
      variables,
      parseResponse,
    };
  };
};

export default buildQueryFactory(
  buildVariables,
  getGqlQuery,
  getResponseParser
);
