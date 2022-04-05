// Packages
import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {};

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const Gallery = ({ classes }) => {
  return (
    <ImageGallery
      items={images}
    />
  );
};

export default withStyles(styles)(Gallery);
