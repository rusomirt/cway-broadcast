// Packages
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-photo-gallery';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {};

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
const Gallery = ({ classes }) => {
  return (
    <ImageGallery photos={photos} />
  );
};

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
