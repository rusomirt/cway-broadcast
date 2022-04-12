// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

// Child components
import { LoadingIndicator, ErrorDialog } from '@cway/cway-frontend-common/components';
import LeftPanel from './components/LeftPanel';
// import Gallery from './components/Gallery';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {
    display: 'flex',
    height: '100vh',
  },
};

const BROADCAST = loader('@cway/cway-frontend-common/graphql/secured/queries/Broadcast.graphql');

const Broadcast = ({ classes }) => {
  console.group('Broadcast()');
  const { data: broadcastData, loading: broadcastLoading, error: broadcastError } =
    useQuery(BROADCAST, { variables: { id: '663c2e05-1208-46bf-b32f-0f354eec8ae0' } });

  if (broadcastLoading || broadcastError) {
    console.groupEnd();
  }
  if (broadcastLoading) return <LoadingIndicator fullscreen />;
  if (broadcastError) return <ErrorDialog sentryError={broadcastError} componentName="App" />;

  console.groupEnd();

  return (
    <div className={classes.root}>
      <LeftPanel flatTreeData={broadcastData.broadcast.fileDescriptor} />
      {/*<Gallery />*/}
    </div>
  );
};

Broadcast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Broadcast);
