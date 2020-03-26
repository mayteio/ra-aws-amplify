import { DataProvider } from 'ra-core';
import { AUTH_TYPE } from 'aws-appsync-auth-link';
import { useState, useEffect } from 'react';

import { useUser } from '../AmplifyAuthProvider';
import { buildAmplifyProvider } from './buildAmplifyProvider';
import { getAuthType } from './getAuthType';

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
    // if (specifiedAuthType === AUTH_TYPE.AMAZON_COGNITO_USER_POOLS && !user) {
    //   return;
    // }

    buildDataProvider(specifiedAuthType).then(dataProvider =>
      setDataProvider(() => dataProvider)
    );
  }, [user, specifiedAuthType]);

  return dataProvider;
}
