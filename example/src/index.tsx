import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { AmplifyAuthProvider } from '../../';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

ReactDOM.render(
  <AmplifyAuthProvider>
    <App />
  </AmplifyAuthProvider>,
  document.getElementById('root')
);
