// Packages
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-photo-gallery';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {
    flex: 1,
    overflowY: 'auto',
  },
};

const photos = [
  {
    src: 'http://example.com/example/img1.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'http://example.com/example/img2.jpg',
    width: 1,
    height: 1
  }
];
const Gallery = ({ classes, fileIds }) => {
  return (
    <div className={classes.root}>
      {fileIds.map((id) => <p>{id}</p>)}
    </div>
  );
  return (
    <ImageGallery photos={photos} />
  );
};

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
  fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Gallery);
