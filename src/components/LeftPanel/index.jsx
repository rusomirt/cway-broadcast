// Packages
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {
    flex: 0,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightgray',
    padding: 5,
  },
  panel: {
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
  },
};

// const BROADCAST = loader('@cway/cway-frontend-common/graphql/public/queries/Broadcast.graphql');
const broadcastMock = {
  id: 'uuid_broadcast',
  name: 'bc1',
  type: 'FOLDER',
  fileDescriptor: [
    {
      __typename: 'FDFolder',
      id: 'folder1uuid',
      name: 'folder1',
    },
    {
      __typename: 'FDFolder',
      id: 'folder2uuid',
      name: 'folder2',
    },
    {
      __typename: 'FDFile',
      id: 'file11uuid',
      name: 'file11',
      parent: 'folder1uuid',
    },
    {
      __typename: 'FDFile',
      id: 'file12uuid',
      name: 'file12',
      parent: 'folder1uuid',
    },
    {
      __typename: 'FDFile',
      id: 'file21uuid',
      name: 'file21',
      parent: 'folder2uuid',
    },
    {
      __typename: 'FDFolder',
      id: 'folder13uuid',
      name: 'folder13',
      parent: 'folder1uuid',
    },
    {
      __typename: 'FDFile',
      id: 'file131uuid',
      name: 'file131',
      parent: 'folder13uuid',
    },
    {
      __typename: 'FDFolder',
      id: 'folder14uuid',
      name: 'folder14',
      parent: 'folder1uuid',
    },
  ],
};

const LeftPanel = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.panel}></div>
    </div>
  );
};

export default withStyles(styles)(LeftPanel);
