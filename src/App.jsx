// Packages
import React, { useState } from 'react';
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

  // ---------- Get broadcast data from backend --------------------

  const { data: broadcastData, loading: broadcastLoading, error: broadcastError } =
    useQuery(BROADCAST, { variables: { id: '663c2e05-1208-46bf-b32f-0f354eec8ae0' } });

  // ---------- Tree item selection --------------------

  const [selectedItemPath, setSelectedItemPath] = useState([]);
  console.log('selectedItemPath: ', selectedItemPath);
  const createSelectedItemPath = (flatTreeData, selectedId) => {
    console.group(`createSelectedItemPath(${selectedId})`);
    const getParentId = (itemId) => flatTreeData.find(({ id }) => id === itemId).parent;
    const path = [selectedId];
    console.log('path: ', path);
    let pId = getParentId(selectedId);
    console.log('pId: ', pId);
    // Iterate selected folder ancestors
    while (pId) {
      path.unshift(pId);    // put parent ID at the beginning of path array
      console.log('path: ', path);
      pId = getParentId(pId);
      console.log('pId: ', pId);
    }
    console.groupEnd();
    return path;
  };
  const handleSelectItem = (id) => {
    // setValueInBrowser({ name: 'mc_selectPath', value: id, expireDate: '' });
    setSelectedItemPath(createSelectedItemPath(broadcastData?.broadcast.fileDescriptor, id));
    // onSelectFolder(id);
  };

  // ---------- GraphQL loading and error state --------------------

  if (broadcastLoading || broadcastError) {
    console.groupEnd();
  }
  if (broadcastLoading) return <LoadingIndicator fullscreen />;
  if (broadcastError) return <ErrorDialog sentryError={broadcastError} componentName="App" />;

  // ------------------------------------------------------------

  console.groupEnd();

  return (
    <div className={classes.root}>
      <LeftPanel
        flatTreeData={broadcastData.broadcast.fileDescriptor}
        selectedItemPath={selectedItemPath}
        handleSelectItem={handleSelectItem}
      />
      {/*<Gallery />*/}
    </div>
  );
};

Broadcast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Broadcast);
