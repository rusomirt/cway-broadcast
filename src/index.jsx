// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';

// GraphQL client
import ApolloClient from './api/Apollo';

// Child components
import App from './App';

// Child components
import { ErrorBoundary } from '@cway/cway-frontend-common/components';

// Styling
import theme from './theme';
import './common.css';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={ApolloClient}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('container'),
);
