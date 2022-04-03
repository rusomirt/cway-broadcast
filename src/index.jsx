// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';

// GraphQL client
import ApolloClient from './api/Apollo';

// Styling
import theme from './theme';
import './common.css';

// Child components
import { ErrorBoundary } from '@cway/cway-frontend-common/components';

const Broadcast = () => {
  return (
    <div>Broadcast</div>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={ApolloClient}>
      <ErrorBoundary>
        <Broadcast />
      </ErrorBoundary>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('container'),
);
