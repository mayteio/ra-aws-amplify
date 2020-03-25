import { DataProvider } from 'ra-core';
// import { IntrospectionResultData } from 'apollo-cache-inmemory';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, AuthOptions } from 'aws-appsync-auth-link';
import { useState, useEffect } from 'react';

import { useUser } from '../AmplifyAuthProvider';
import { buildAmplifyProvider } from './buildAmplifyProvider';

interface useDataProviderArgs {
  config: Record<string, any>;
  authType?: AUTH_TYPE | undefined;
  queries: any;
  mutations: any;
  schema: any;
  // schema: {
  //   data: IntrospectionResultData | any;
  // };
}

const getAuthType = (
  config: Record<string, any>,
  specifiedAuthType?: AUTH_TYPE | undefined
): AuthOptions => {
  const authType =
    specifiedAuthType ||
    config.aws_appsync_authenticationType ||
    AUTH_TYPE.NONE;
  switch (authType) {
    case AUTH_TYPE.AMAZON_COGNITO_USER_POOLS:
      return {
        // @ts-ignore
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () =>
          (await Auth.currentSession()).getAccessToken().getJwtToken(),
      };

    case AUTH_TYPE.API_KEY:
      return {
        type: AUTH_TYPE.API_KEY,
        apiKey: config.aws_appsync_apiKey,
      };
    case AUTH_TYPE.NONE:
    default:
      return {
        type: AUTH_TYPE.NONE,
      };
  }
};

export function useAmplifyDataProvider({
  config,
  schema,
  queries,
  mutations,
  authType = undefined,
}: useDataProviderArgs): any {
  const [dataProvider, setDataProvider] = useState<DataProvider | any>();

  // try to guess the auth type based on config, otherwise specified
  const buildDataProvider = async (authType: AUTH_TYPE) => {
    const auth = getAuthType(config, authType);
    return await buildAmplifyProvider({
      endpoint: config.aws_appsync_graphqlEndpoint,
      auth: {
        url: config.aws_appsync_graphqlEndpoint,
        region: config.aws_appsync_region,
        auth,
      },
      schema,
      queries,
      mutations,
    });
  };

  /** Rebuild dataProvider */
  const user = useUser();
  let specifiedAuthType = authType || config.aws_appsync_authenticationType;

  useEffect(() => {
    if (specifiedAuthType === AUTH_TYPE.AMAZON_COGNITO_USER_POOLS && !user) {
      specifiedAuthType = AUTH_TYPE.NONE;
    }

    buildDataProvider(specifiedAuthType).then(dataProvider =>
      setDataProvider(() => dataProvider)
    );
  }, [user, specifiedAuthType]);

  return dataProvider;
}
