// Packages
import React from 'react';
import PropTypes from 'prop-types';
// import ImageGallery from 'react-photo-gallery';

// Child components
import { ImagePreview } from '@cway/cway-frontend-common/components';

// Constants
// import { previewSizeEnum } from '@cway/cway-frontend-common/constants';

// Helpers
import { getPreviewUrl } from '@cway/cway-frontend-common/utils';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'start',
  },
  imageWrapper: {
    flex: 0,
    padding: 5,
  },
};

const Gallery = ({ classes, fileIds }) => {
  // return (
  //   <div className={classes.root}>
  //     {fileIds.map((id) => <img key={id} height="200" src={getPreviewUrl({ id })} alt="" />)}
  //   </div>
  // );

  // return (
  //   <div className={classes.root}>
  //     {fileIds.map((id) => <p key={id}>{id}</p>)}
  //   </div>
  // );

  // const images = fileIds.map((id) => ({ src: getPreviewUrl({ id }), width: 1, height: 1 }));
  // return (
  //   <ImageGallery photos={images} />
  // );

  const previewSizeLimits = { width: 150, height: 150 };
  return (
    <div className={classes.root}>
      {fileIds.map((id) => (
        <div className={classes.imageWrapper} key={id}>
          <ImagePreview
            url={getPreviewUrl({ id })}
            maxWidth={previewSizeLimits.width}
            maxHeight={previewSizeLimits.height}
          />
        </div>
      ))}
    </div>
  );
};

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
  fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Gallery);
