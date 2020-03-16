import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './src/';
import { AmplifyProvider } from '../';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

ReactDOM.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>,
  document.getElementById('root')
);
