// Packages
import React from 'react';
import PropTypes from 'prop-types';

// Child components
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
      id: 'folder132uuid',
      name: 'folder132',
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

const Broadcast = ({ classes }) => {
  return (
    <div className={classes.root}>
      <LeftPanel flatTreeData={broadcastMock.fileDescriptor} />
      {/*<Gallery />*/}
    </div>
  );
};

Broadcast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Broadcast);
