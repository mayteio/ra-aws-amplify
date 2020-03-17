import React, { useEffect, useState, useContext } from 'react';
import Auth, { AuthClass } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { HubCapsule } from '@aws-amplify/core/lib-esm/Hub';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const NOT_INSIDE_AMPLIFY_PROVIDER =
  'No AuthenticationContext. Did you forget to wrap your app in <AmplifyProvider />?';

/** Provides the entire Auth object via a hook to use it with hooks. Sugar. */
const AmplifyAuthContext = React.createContext<AuthClass | undefined>(
  undefined
);
/** provides the authProvider required by react-admin */
const RaAuthProviderContext = React.createContext<any | undefined>(undefined);

/** Provides just the user object */
const UserContext = React.createContext<CognitoUser | undefined>(undefined);

/**
 * This is written specifically for Amplify/Hub, however, you can replace
 * this provider with another provider (say <AzureProvider />) that replicates
 * the API above and everything using useAuth and useUser should just work!
 */
export const RaAmplifyAuthProvider: React.FC = ({ children }) => {
  // on mount, store the user and listen to hub changes (Amplify's internal)
  const [user, setUser] = useState<undefined | CognitoUser>(undefined);
  useEffect(() => {
    // get user on mount with a immediately invoked function
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user === 'not authenticated' ? undefined : user);
      } catch (error) {
        // trackBug(error)
      }
    })();

    // bind hub listener for auth changes
    const listener = async ({ payload }: HubCapsule) => {
      if (payload.event === 'signIn') {
        try {
          const user = await Auth.currentAuthenticatedUser();
          setUser(user);
        } catch (error) {
          // trackBug(error)
        }
      } else if (payload.event === 'signOut') {
        setUser(undefined);
      }
    };
    Hub.listen('auth', listener);

    // clean up hub listener
    return () => {
      Hub.remove('auth', listener);
    };
  }, []);

  /**
   * Used by react-admin
   */
  const authProvider = {
    /** Signs in either using username and password, or federated if a provider is passed. */
    login: ({ username, password, provider }: any) =>
      username && password && !provider
        ? Auth.signIn(username, password)
        : Auth.federatedSignIn({ provider }),
    logout: () => Auth.signOut(),
    checkAuth: () => Auth.currentAuthenticatedUser(),
    checkError: () => Auth.currentCredentials(),
    /** Providers permissions for the whole app. identityId is used with S3Input. */
    getPermissions: () =>
      Promise.all([
        Auth.currentAuthenticatedUser(),
        Auth.currentCredentials(),
      ]).then(([user, { identityId }]) => ({
        groups: user.signInUserSession.accessToken.payload['cognito:groups'],
        identityId,
      })),
  };

  return (
    <AmplifyAuthContext.Provider value={Auth}>
      <RaAuthProviderContext.Provider value={authProvider}>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </RaAuthProviderContext.Provider>
    </AmplifyAuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AmplifyAuthContext);
  if (!context) throw Error(NOT_INSIDE_AMPLIFY_PROVIDER);
  return context;
}

export function useRaAuthProvider() {
  const context = useContext(RaAuthProviderContext);
  if (!context) throw Error(NOT_INSIDE_AMPLIFY_PROVIDER);
  return context;
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
