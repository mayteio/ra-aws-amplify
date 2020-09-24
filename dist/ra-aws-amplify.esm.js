import merge from 'lodash-es/merge';
import buildGraphQLProvider from 'ra-data-graphql';
import { UPDATE, CREATE, DELETE, GET_ONE, GET_MANY_REFERENCE, GET_MANY, GET_LIST, UPDATE_MANY, DELETE_MANY } from 'ra-core';
import { TypeKind } from 'graphql';
import gql from 'graphql-tag';
import { createAppSyncLink } from 'aws-appsync';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import React, { useState, useEffect, useContext } from 'react';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { AUTH_TYPE } from 'aws-appsync-auth-link';
import { Auth as Auth$1, Storage } from 'aws-amplify';
import { Button, CircularProgress, Link, makeStyles } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector } from 'react-redux';
import { CRUD_GET_LIST_SUCCESS, usePermissions, useInput, useNotify, FileInput, ImageInput } from 'react-admin';
import ImageIcon from '@material-ui/icons/ImageRounded';
import MovieIcon from '@material-ui/icons/MovieRounded';
import DescriptionIcon from '@material-ui/icons/DescriptionRounded';
import { uuid } from 'uuidv4';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/**
 * Ensure we get the real type even if the root type is NON_NULL or LIST
 * @param {GraphQLType} type
 */

var getFinalType = function getFinalType(type) {
  if ((type === null || type === void 0 ? void 0 : type.kind) === TypeKind.NON_NULL || (type === null || type === void 0 ? void 0 : type.kind) === TypeKind.LIST) {
    return getFinalType(type.ofType);
  }

  return type;
};

var castType = function castType(value, type) {
  switch (type.kind + ":" + type.name) {
    case 'SCALAR:Int':
      return Number(value);

    case 'SCALAR:String':
      return String(value);

    case 'SCALAR:Boolean':
      return Boolean(value);

    default:
      return value;
  }
};

var cleanS3Object = function cleanS3Object(input) {
  var fields = ['key', 'level', 'identityId', 'region', 'bucket'];
  return Object.entries(input).reduce(function (acc, _ref) {
    var k = _ref[0],
        v = _ref[1];

    if (fields.includes(k)) {
      acc[k] = v;
    }

    return acc;
  }, {});
};

var prepareParams = function prepareParams(params, queryType, introspectionResults) {
  var result = {};

  if (!params) {
    return params;
  }

  Object.keys(params).forEach(function (key) {
    try {
      var param = params[key];
      var arg = null;

      if (!param) {
        result[key] = param;
        return Promise.resolve();
      }

      if (queryType && Array.isArray(queryType.args)) {
        arg = queryType.args.find(function (item) {
          return item.name === key;
        });
      }

      if (param instanceof File || key === 'rawFile') {
        // file upload should be handled with Storage
        return Promise.resolve();
      }

      if (param instanceof Date) {
        result[key] = param.toISOString();
        return Promise.resolve();
      }

      if (param instanceof Object && !Array.isArray(param) && arg && arg.type.kind === 'INPUT_OBJECT') {
        var args = introspectionResults.types.find(function (item) {
          return item.kind === arg.type.kind && item.name === arg.type.name;
        }).inputFields;
        result[key] = prepareParams(param, {
          args: args
        }, introspectionResults);
        return Promise.resolve();
      }

      if (param instanceof Object && !param instanceof Date && !Array.isArray(param)) {
        result[key] = prepareParams(param, queryType, introspectionResults);
        return Promise.resolve();
      }

      if (!arg) {
        result[key] = param;
        return Promise.resolve();
      }

      result[key] = castType(param, arg.type);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  });
  return result;
};
/**
 * This handles filtering and sorting.
 */


var buildGetListVariables = function buildGetListVariables(introspectionResults) {
  return function (resource, _aorFetchType, params) {
    console.log('params: ', params); // console.log(params);

    var _ref2 = params.filter || {},
        token = _ref2.nextToken;

    var nextToken = token && params.pagination.page > 1 ? token : undefined;
    console.log('nextToken: ', nextToken); // return {};

    return {
      nextToken: nextToken
    };
  };
};
/**
 * This handles sanitisation of upload data.
 */


var buildCreateUpdateVariables = function buildCreateUpdateVariables(introspectionResults) {
  return function ( // unused, left for code cohesion. Can remove in future iterations if unused.
  _resource, _fetchType, // used arguments
  params, queryType) {
    /** Get the accepted arguments from the schema introspection */
    var inputArgument = queryType.args.find(function (a) {
      return a.name === 'input';
    });
    var inputTypeName = getFinalType(inputArgument.type);

    var _introspectionResults = introspectionResults.types.find(function (t) {
      return t.name === inputTypeName.name;
    }),
        inputFields = _introspectionResults.inputFields;
    /** Generate GraphQL input */


    var input = Object.keys(params.data).reduce(function (acc, key) {
      var _getFinalType$name, _extends11;

      /** Get the input field (i.e. CreatePostInput) for validation */
      var inputField = inputFields.find(function (f) {
        return f.name === key;
      });
      /** Skip any params passed that are not an input field */

      if (!inputField || !inputFields.find(function (f) {
        return f.name === inputField.name;
      })) {
        return acc;
      }
      /** Strip any S3Objects of unnecessary fields, pulling only what we need. */


      if ((_getFinalType$name = getFinalType(inputField.type).name) === null || _getFinalType$name === void 0 ? void 0 : _getFinalType$name.match(/S3Object/i)) {
        var _extends10;

        /** S3Object fields could be an array. */
        var cleanS3Param = Array.isArray(params.data[key]) ? params.data[key].map(cleanS3Object) : cleanS3Object(params.data[key]);
        return _extends({}, acc, (_extends10 = {}, _extends10[key] = cleanS3Param, _extends10));
      }

      return _extends({}, acc, (_extends11 = {}, _extends11[key] = params.data[key], _extends11));
    }, {});
    return {
      input: input
    };
  };
};

var buildVariables = (function (introspectionResults) {
  return function (resource, aorFetchType, params, queryType) {
    var _ref3;

    var preparedParams = prepareParams(params, queryType, introspectionResults);

    switch (aorFetchType) {
      case GET_LIST:
        {
          return buildGetListVariables()(resource, aorFetchType, preparedParams);
        }

      case GET_MANY:
        return preparedParams.ids.reduce(function (acc, id, i) {
          acc["id" + i] = id;
          return acc;
        }, {});
      // return {
      //   limit: params.ids.length,
      //   filter: {
      //     or: params.ids.map((id: string | number) => ({ id: { eq: id } })),
      //   },
      // };

      case GET_MANY_REFERENCE:
        // grab the arg the secondary GSI key is searching for an use that
        // as the param in our query.
        var query = introspectionResults.queries.find(function (q) {
          return q.name === params.target;
        });

        if (!query) {
          throw Error("Couldn't find a query for " + params.target + ". Did you forget to add a param queryField to your @key directive for " + params.target + "? See https://github.com/mayteio/ra-aws-amplify#a-post-with-comments-using-the-referencemanyfield-");
        }

        var key = query.args[0].name;
        return _ref3 = {
          limit: preparedParams.pagination.perPage
        }, _ref3[key] = preparedParams.id, _ref3;

      case GET_ONE:
        return {
          id: preparedParams.id
        };

      case DELETE:
        return {
          input: {
            id: preparedParams.id
          }
        };

      case CREATE:
      case UPDATE:
        {
          return buildCreateUpdateVariables(introspectionResults)(resource, aorFetchType, preparedParams, queryType);
        }
    }
  };
});

var getGqlQuery = function getGqlQuery(_introspectionResults) {
  return function (raFetchType, resource, params, queries, mutations) {
    switch (raFetchType) {
      case GET_LIST:
        return gql(queries["list" + resource.type.name + "s"]);

      case GET_ONE:
        return gql(queries["get" + resource.type.name]);

      case GET_MANY_REFERENCE:
        var targetQuery = params.target;
        return gql(queries[targetQuery]);

      case CREATE:
        return gql(mutations["create" + resource.type.name]);

      case UPDATE:
        return gql(mutations["update" + resource.type.name]);

      case DELETE:
        return gql(mutations["delete" + resource.type.name]);

      default:
        return undefined;
    }
  };
};

var LARGE_TOTAL = 9999;

var sanitizeResource = function sanitizeResource(data) {
  var result = Object.keys(data).reduce(function (acc, key) {
    var _extends5;

    if (key.startsWith('_')) {
      return acc;
    }

    var dataKey = data[key];

    if (dataKey === null || dataKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataKey)) {
      if (typeof dataKey[0] === 'object') {
        var _extends2;

        return _extends({}, acc, (_extends2 = {}, _extends2[key] = dataKey.map(sanitizeResource), _extends2[key + "Ids"] = dataKey.map(function (d) {
          return d.id;
        }), _extends2));
      } else {
        var _extends3;

        return _extends({}, acc, (_extends3 = {}, _extends3[key] = dataKey, _extends3));
      }
    }

    if (typeof dataKey === 'object') {
      var _ref, _extends4;

      return _extends({}, acc, dataKey && dataKey.id && (_ref = {}, _ref[key + ".id"] = dataKey.id, _ref), (_extends4 = {}, _extends4[key] = sanitizeResource(dataKey), _extends4));
    }

    return _extends({}, acc, (_extends5 = {}, _extends5[key] = dataKey, _extends5));
  }, {});
  return result;
};

var getResponseParser = (function (_introspectionResults) {
  return function (aorFetchType, resource, queryType, params) {
    return function (response) {
      var data = response.data;

      if (aorFetchType === GET_LIST) {
        return {
          data: data["list" + resource.type.name + "s"].items.map(sanitizeResource),
          // nextToken: data[`list${resource.type.name}s`].nextToken,
          total: LARGE_TOTAL
        };
      }

      if (aorFetchType === GET_MANY_REFERENCE) {
        return {
          data: data[params.target] && data[params.target].items.map(sanitizeResource),
          // nextToken: data[params.target].nextToken,
          total: LARGE_TOTAL
        };
      }

      return {
        data: data[queryType.name] && sanitizeResource(data[queryType.name]),
        total: LARGE_TOTAL
      };
    };
  };
});

var buildQueryFactory = function buildQueryFactory(buildVariablesImpl, getGqlQuery, getResponseParserImpl) {
  return function (_ref) {
    var queries = _ref.queries,
        mutations = _ref.mutations;
    return function (introspectionResults) {
      var knownResources = introspectionResults.resources.map(function (r) {
        return r.type.name;
      });
      return function (aorFetchType, resourceName, params) {
        console.log(aorFetchType, resourceName, params);
        var resource = introspectionResults.resources.find(function (r) {
          return r.type.name === resourceName;
        });

        if (!resource) {
          throw new Error("Unknown resource " + resourceName + ". Make sure it has been declared on your server side schema. Known resources are " + knownResources.join(', '));
        }

        var queryType = resource[aorFetchType];

        if (!queryType) {
          throw new Error("No query or mutation matching fetch type " + aorFetchType + " could be found for resource " + resource.type.name);
        }

        var variables = buildVariablesImpl(introspectionResults)(resource, aorFetchType, params, queryType);
        var query = getGqlQuery(introspectionResults)(aorFetchType, resource, params, queries, mutations);
        var parseResponse = getResponseParserImpl(introspectionResults)(aorFetchType, resource, queryType, params);
        return {
          query: query,
          variables: variables,
          parseResponse: parseResponse
        };
      };
    };
  };
};
var defaultBuildQuery = /*#__PURE__*/buildQueryFactory(buildVariables, getGqlQuery, getResponseParser);

var createClient = function createClient(_ref) {
  var endpoint = _ref.endpoint,
      auth = _ref.auth;
  // create HTTPLink
  var httpLink = createHttpLink({
    uri: endpoint
  }); // create AppSyncLink

  var awsLink = createAppSyncLink(auth);
  var fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: []
      }
    }
  });
  return new ApolloClient({
    link: awsLink.concat(httpLink),
    cache: new InMemoryCache({
      fragmentMatcher: fragmentMatcher
    })
  });
};

var _SINGLE_OPERATION_MAP, _operationNames;
var SINGLE_OPERATION_MAP = (_SINGLE_OPERATION_MAP = {}, _SINGLE_OPERATION_MAP[GET_MANY] = GET_ONE, _SINGLE_OPERATION_MAP[UPDATE_MANY] = UPDATE, _SINGLE_OPERATION_MAP[DELETE_MANY] = DELETE, _SINGLE_OPERATION_MAP);
var defaultOptions = {
  introspection: {
    operationNames: (_operationNames = {}, _operationNames[GET_LIST] = function (resource) {
      return "list" + resource.name + "s";
    }, _operationNames[GET_ONE] = function (resource) {
      return "get" + resource.name;
    }, _operationNames[GET_MANY] = function (resource) {
      return "list" + resource.name + "s";
    }, _operationNames[GET_MANY_REFERENCE] = function (resource) {
      return "list" + resource.name + "s";
    }, _operationNames[CREATE] = function (resource) {
      return "create" + resource.name;
    }, _operationNames[UPDATE] = function (resource) {
      return "update" + resource.name;
    }, _operationNames[DELETE] = function (resource) {
      return "delete" + resource.name;
    }, _operationNames),
    exclude: undefined,
    include: undefined
  }
};
var buildAmplifyProvider = function buildAmplifyProvider(_ref) {
  var queries = _ref.queries,
      mutations = _ref.mutations,
      schema = _ref.schema,
      options = _objectWithoutPropertiesLoose(_ref, ["queries", "mutations", "schema"]);

  var client = createClient(_extends({}, options));
  var buildQuery = defaultBuildQuery({
    queries: queries,
    mutations: mutations,
    schema: schema
  });
  var args = merge({
    client: client,
    buildQuery: buildQuery
  }, defaultOptions, options, {
    introspection: {
      schema: schema.data.__schema
    }
  });
  return buildGraphQLProvider(args).then(function (defaultDataProvider) {
    return function (fetchType, resource, params) {
      // Amplify does not support multiple deletions so instead we send multiple DELETE requests
      // This can be optimized using the apollo-link-batch-http
      var otherParams = _objectWithoutPropertiesLoose(params, ["ids"]);

      console.log("FETCH TYPE: " + fetchType);

      switch (fetchType) {
        case DELETE_MANY:
          return Promise.all(params.ids.map(function (id) {
            return defaultDataProvider(SINGLE_OPERATION_MAP[fetchType], resource, _extends({
              id: id
            }, otherParams));
          })).then(function (results) {
            var data = results.reduce(function (acc, _, idx) {
              return [].concat(acc, [params.ids[idx]]);
            }, []);
            return {
              data: data
            };
          });

        case UPDATE_MANY:
        case GET_MANY:
          return Promise.all(params.ids.map(function (id) {
            return defaultDataProvider(SINGLE_OPERATION_MAP[fetchType], resource, _extends({
              id: id
            }, otherParams));
          })).then(function (results) {
            var data = fetchType === GET_MANY ? results.map(function (result) {
              return result.data;
            }) : results.reduce(function (acc, _ref2) {
              var data = _ref2.data;
              return [].concat(acc, [data.id]);
            }, []);
            return {
              data: data
            };
          });

        default:
          return defaultDataProvider(fetchType, resource, params);
      }
    };
  });
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var NOT_INSIDE_AMPLIFY_PROVIDER = 'No AuthenticationContext. Did you forget to wrap your app in <AmplifyProvider />?';
/** Provides the entire Auth object via a hook to use it with hooks. Sugar. */

var AmplifyAuthContext = /*#__PURE__*/React.createContext(undefined);
/** Provides just the user object */

var UserContext = /*#__PURE__*/React.createContext(undefined);
/**
 * This is written specifically for Amplify/Hub, however, you can replace
 * this provider with another provider (say <AzureProvider />) that replicates
 * the API above and everything using useAuth and useUser should just work!
 */

var AmplifyAuthProvider = function AmplifyAuthProvider(_ref) {
  var children = _ref.children;

  // on mount, store the user and listen to hub changes (Amplify's internal)
  var _useState = useState(undefined),
      user = _useState[0],
      setUser = _useState[1];

  useEffect(function () {
    // get user on mount with a immediately invoked function
    (function () {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(Auth.currentAuthenticatedUser()).then(function (user) {
            setUser(user === 'not authenticated' ? undefined : user);
          });
        }, function () {});

        return _temp2 && _temp2.then ? _temp2.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })(); // bind hub listener for auth changes


    var listener = function listener(_ref2) {
      var payload = _ref2.payload;

      try {
        var _temp5 = function () {
          if (payload.event === 'signIn') {
            var _temp6 = _catch(function () {
              return Promise.resolve(Auth.currentAuthenticatedUser()).then(function (user) {
                setUser(user);
              });
            }, function () {});

            if (_temp6 && _temp6.then) return _temp6.then(function () {});
          } else if (payload.event === 'signOut') {
            setUser(undefined);
          }
        }();

        return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    Hub.listen('auth', listener); // clean up hub listener

    return function () {
      Hub.remove('auth', listener);
    };
  }, []);
  /**
   * Used by react-admin
   */

  return React.createElement(AmplifyAuthContext.Provider, {
    value: Auth
  }, React.createElement(UserContext.Provider, {
    value: user
  }, children));
};
function useAuth() {
  var context = useContext(AmplifyAuthContext);
  if (!context) throw Error(NOT_INSIDE_AMPLIFY_PROVIDER);
  return context;
}
function useAuthProvider() {
  return {
    /** Signs in either using username and password, or federated if a provider is passed. */
    login: function login(_ref3) {
      var username = _ref3.username,
          password = _ref3.password,
          provider = _ref3.provider;
      return username && password && !provider ? Auth.signIn(username, password) : Auth.federatedSignIn({
        provider: provider
      });
    },
    logout: function logout() {
      return Auth.signOut();
    },
    checkAuth: function checkAuth() {
      return Auth.currentSession();
    },
    checkError: function checkError() {
      return Auth.currentCredentials();
    },

    /** Providers permissions for the whole app. identityId is used with S3Input. */
    getPermissions: function getPermissions() {
      return Promise.all([Auth.currentSession(), Auth.currentCredentials()]).then(function (_ref4) {
        var session = _ref4[0],
            identityId = _ref4[1].identityId;
        return {
          claims: _extends({}, session.getIdToken().payload, {
            identityId: identityId
          })
        };
      });
    }
  };
}
function useUser() {
  var context = useContext(UserContext);
  return context;
}

var getAuthType = function getAuthType(config, specifiedAuthType) {
  var authType = specifiedAuthType || config.aws_appsync_authenticationType || AUTH_TYPE.NONE;

  switch (authType) {
    case AUTH_TYPE.AMAZON_COGNITO_USER_POOLS:
      return {
        // @ts-ignore
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: function () {
          try {
            return Promise.resolve(_catch(function () {
              return Promise.resolve(Auth$1.currentSession()).then(function (_Auth$currentSession) {
                return _Auth$currentSession.getAccessToken().getJwtToken();
              });
            }, function (error) {
              console.log('error with jwt', error);
              return Promise.reject('Unauthorized');
            }));
          } catch (e) {
            return Promise.reject(e);
          }
        }
      };

    case AUTH_TYPE.API_KEY:
      return {
        type: AUTH_TYPE.API_KEY,
        apiKey: config.aws_appsync_apiKey
      };

    case AUTH_TYPE.NONE:
    default:
      return {
        type: AUTH_TYPE.NONE
      };
  }
};

function useAmplifyDataProvider(_ref) {
  var config = _ref.config,
      schema = _ref.schema,
      queries = _ref.queries,
      mutations = _ref.mutations,
      _ref$authType = _ref.authType,
      authType = _ref$authType === void 0 ? undefined : _ref$authType;

  var _useState = useState(),
      dataProvider = _useState[0],
      setDataProvider = _useState[1]; // try to guess the auth type based on config, otherwise specified


  var buildDataProvider = function buildDataProvider(authType) {
    try {
      var auth = getAuthType(config, authType);
      return Promise.resolve(buildAmplifyProvider({
        endpoint: config.aws_appsync_graphqlEndpoint,
        auth: {
          url: config.aws_appsync_graphqlEndpoint,
          region: config.aws_appsync_region,
          auth: auth
        },
        schema: schema,
        queries: queries,
        mutations: mutations
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /** Rebuild dataProvider */


  var user = useUser();
  var specifiedAuthType = authType || config.aws_appsync_authenticationType;
  useEffect(function () {
    // if (specifiedAuthType === AUTH_TYPE.AMAZON_COGNITO_USER_POOLS && !user) {
    //   return;
    // }
    buildDataProvider(specifiedAuthType).then(function (dataProvider) {
      return setDataProvider(function () {
        return dataProvider;
      });
    });
  }, [user, specifiedAuthType]);
  return dataProvider;
}

function AmplifyPagination(props) {
  var nextToken = useSelector(function (state) {
    return state.nextToken;
  });

  if (props.page === 1 && !nextToken) {
    return null;
  } // useEffect(() => {
  //   // setFilter((prev: any) => ({ ...prev, nextToken }));
  // }, [nextToken]);


  return React.createElement(Toolbar, null, props.page > 1 && React.createElement(Button, {
    color: "primary",
    key: "prev",
    startIcon: React.createElement(ChevronLeft, null),
    onClick: function onClick() {
      return props.setPage(props.page - 1);
    }
  }, "Prev"), nextToken && React.createElement(Button, {
    color: "primary",
    key: "next",
    endIcon: React.createElement(ChevronRight, null),
    onClick: function onClick() {
      return props.setPage(props.page + 1);
    }
  }, "Next"));
}

var nextTokenReducer = function nextTokenReducer(previousState, _ref) {
  if (previousState === void 0) {
    previousState = null;
  }

  var type = _ref.type,
      payload = _ref.payload;

  // store the crud token when it comes back
  if (type === CRUD_GET_LIST_SUCCESS) {
    // console.log(payload);
    return payload.nextToken || null;
  } // remove the nextToken before trying to get a new list
  // if (type === CRUD_GET_LIST) {
  //   return null;
  // }


  return previousState;
};

var S3Field = function S3Field(_ref) {
  var source = _ref.source,
      _ref$record = _ref.record,
      record = _ref$record === void 0 ? {} : _ref$record,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["source", "record", "children"]);

  // store the S3 signed URL in state for use in return
  var _React$useState = React.useState(),
      src = _React$useState[0],
      set = _React$useState[1];

  var _ref2 = source && typeof record[source] === 'object' ? record[source] : record,
      key = _ref2.key,
      identityId = _ref2.identityId,
      level = _ref2.level; // Listen for changes on


  React.useEffect(function () {
    if (key && !key.match(/blob|http/i)) {
      // if level has been passed down, add the appropriate options.
      var options = level === 'protected' || level === 'private' ? {
        level: level,
        identityId: identityId
      } : {}; // get the URL and set it in state

      Storage.get(key, options).then(function (result) {
        return set(result);
      });
    }
  }, [key, level, identityId]); // if there's no source and there is a key, show a loading spinner

  if (!src && key) {
    return React.createElement(CircularProgress, {
      "data-testid": "s3-object-loading"
    });
  } // if there's a src, show the field!


  if (src) {
    var childProps = _extends({
      record: record,
      source: source,
      src: src
    }, props); // @ts-ignore


    return React.cloneElement(children, childProps);
  } // otherwise do nothing


  return null;
};
S3Field.defaultProps = {
  addLabel: true
};

var getIcon = function getIcon(type) {
  switch (type) {
    case 'image/png':
    case 'image/gif':
    case 'image/jpeg':
    case 'image/jpg':
      return ImageIcon;

    case 'video/mp4':
    case 'video/3gpp':
    case 'video/quicktime':
    case 'video/x-msvideo':
      return MovieIcon;

    default:
      return DescriptionIcon;
  }
};

var useStyles = /*#__PURE__*/makeStyles(function (theme) {
  return {
    icon: {
      marginRight: theme.spacing(1)
    }
  };
});
var S3File = function S3File(_ref) {
  var record = _ref.record,
      source = _ref.source;
  var s3Object = record && source && record[source] || record;
  var Icon = getIcon(s3Object.type);
  var classes = useStyles();
  return React.createElement(React.Fragment, null, React.createElement(Icon, {
    titleAccess: "Icon for file type " + (s3Object.type || 'unknown'),
    className: classes.icon
  }), React.createElement(Link, {
    href: s3Object.key,
    title: "Open " + s3Object.key,
    target: "_blank"
  }, "" + s3Object.key + (s3Object.level ? " - " + s3Object.level : '')));
};

var S3FileField = function S3FileField(props) {
  return React.createElement(S3Field, Object.assign({}, props), React.createElement(S3File, null));
};

var S3Image = function S3Image(_ref) {
  var src = _ref.src,
      record = _ref.record,
      source = _ref.source,
      imgProps = _ref.imgProps;
  var s3Object = record && source && record[source] || record;
  return s3Object && src ? React.createElement("img", Object.assign({
    src: src,
    title: s3Object.key
  }, imgProps)) : null;
};

var S3ImageField = function S3ImageField(_ref) {
  var _ref$imgProps = _ref.imgProps,
      imgProps = _ref$imgProps === void 0 ? {} : _ref$imgProps,
      props = _objectWithoutPropertiesLoose(_ref, ["imgProps"]);

  return React.createElement(S3Field, Object.assign({}, props), React.createElement(S3Image, {
    imgProps: imgProps
  }));
};
S3ImageField.defaultProps = {
  addLabel: true
};

var S3Input = function S3Input(_ref) {
  var source = _ref.source,
      _ref$dropzoneOptions = _ref.dropzoneOptions,
      dropzoneOptions = _ref$dropzoneOptions === void 0 ? {} : _ref$dropzoneOptions,
      level = _ref.level,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["source", "dropzoneOptions", "level", "children"]);

  // we use permissions to grab the identityId
  var _usePermissions = usePermissions(),
      permissions = _usePermissions.permissions;

  var _useInput = useInput({
    source: source
  }),
      input = _useInput.input;

  var notify = useNotify();
  /**
   * Handle the react-dropzone onDrop
   * @param {File[]} files files dropped onto the upload area
   */

  var onDrop = function onDrop(files) {
    try {
      var _temp2 = _catch(function () {
        return Promise.resolve(Promise.all(files.map(function (file) {
          var nameParts = file.name.split('.');
          return Storage.put(nameParts[0] + "-" + uuid().split('-').slice(0, 2).join('-') + "." + nameParts[1], file).then(function (result) {
            var value = {
              key: result.key,
              type: file.type,
              level: null,
              identityId: null
            };

            if (level === 'protected' || level === 'private') {
              value.identityId = permissions.claims.identityId;
              value.level = level;
            }

            return value;
          });
        }))).then(function (results) {
          if (props.multiple) {
            input.onChange(results);
          } else {
            input.onChange(results[0]);
          }
        });
      }, function () {
        input.onChange(undefined);
        notify('There was an error uploading your files.');
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var childProps = _extends({
    source: source,
    options: _extends({
      onDrop: onDrop
    }, dropzoneOptions)
  }, props); // @ts-ignore


  return React.cloneElement(children, childProps);
};

var useStyles$1 = /*#__PURE__*/makeStyles({
  fileInput: {
    '& .previews > div': {
      display: 'flex',
      alignItems: 'center'
    }
  }
});
var S3FileInput = function S3FileInput(props) {
  // S3Input clones the element and injects the logic as props
  var classes = useStyles$1();
  return React.createElement(S3Input, Object.assign({}, props), React.createElement(FileInput, {
    className: classes.fileInput
  }, React.createElement(S3FileField, {
    source: props.source
  })));
};

var S3ImageInput = function S3ImageInput(props) {
  return React.createElement(S3Input, Object.assign({}, props), React.createElement(ImageInput, null, React.createElement(S3ImageField, {
    source: props.source
  })));
};

var reducers = {
  nextToken: nextTokenReducer
};

export { AmplifyAuthProvider, AmplifyPagination, NOT_INSIDE_AMPLIFY_PROVIDER, S3Field, S3FileField, S3FileInput, S3ImageField, S3ImageInput, S3Input, buildAmplifyProvider, nextTokenReducer, reducers, useAmplifyDataProvider, useAuth, useAuthProvider, useUser };
//# sourceMappingURL=ra-aws-amplify.esm.js.map
