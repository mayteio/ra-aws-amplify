import React from 'react';
import { AuthClass } from '@aws-amplify/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
export declare const NOT_INSIDE_AMPLIFY_PROVIDER = "No AuthenticationContext. Did you forget to wrap your app in <AmplifyProvider />?";
/**
 * This is written specifically for Amplify/Hub, however, you can replace
 * this provider with another provider (say <AzureProvider />) that replicates
 * the API above and everything using useAuth and useUser should just work!
 */
export declare const AmplifyAuthProvider: React.FC;
export declare function useAuth(): AuthClass;
export declare function useAuthProvider(): {
    /** Signs in either using username and password, or federated if a provider is passed. */
    login: ({ username, password, provider }: any) => Promise<any>;
    logout: () => Promise<any>;
    checkAuth: () => Promise<import("amazon-cognito-identity-js").CognitoUserSession>;
    checkError: () => Promise<import("@aws-amplify/core").ICredentials>;
    /** Providers permissions for the whole app. identityId is used with S3Input. */
    getPermissions: () => Promise<{
        claims: {
            identityId: string;
        };
    }>;
};
export declare function useUser(): CognitoUser | undefined;
