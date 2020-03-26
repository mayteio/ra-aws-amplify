import { AUTH_TYPE, AuthOptions } from 'aws-appsync-auth-link';
import { Auth } from 'aws-amplify';

export const getAuthType = (
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
        jwtToken: async () => {
          try {
            return (await Auth.currentSession()).getAccessToken().getJwtToken();
          } catch (error) {
            console.log('error with jwt', error);
            return Promise.reject('Unauthorized');
          }
        },
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
