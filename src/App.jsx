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

const Broadcast = ({ classes }) => {
  return (
    <div className={classes.root}>
      <LeftPanel />
      {/*<Gallery />*/}
    </div>
  );
};

export default withStyles(styles)(Broadcast);
