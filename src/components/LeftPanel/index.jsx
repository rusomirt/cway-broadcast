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

const LeftPanel = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.panel}></div>
    </div>
  );
};

export default withStyles(styles)(LeftPanel);
