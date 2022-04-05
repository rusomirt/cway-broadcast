// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';

// GraphQL client
import ApolloClient from './api/Apollo';

// Child components
import LeftPanel from './components/LeftPanel';
import Gallery from './components/Gallery';

// Child components
import { ErrorBoundary } from '@cway/cway-frontend-common/components';

// Styling
import theme from './theme';
import './common.css';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {},
};

const Broadcast = ({ classes }) => {
  return (
    <div>
      <LeftPanel />
      <Gallery />
    </div>
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
