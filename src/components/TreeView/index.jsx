// Library packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Constants
import { colors } from '@cway/cway-frontend-common/constants';

// Icons
import { CaretDownIcon, FolderIcon, FileIcon, FileOIcon } from '@cway/cway-frontend-common/icons';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  container: {
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
  },

  arrow: {
    display: 'inline-block',
    fontSize: '1.3rem',
    color: 'inherit',
    userSelect: 'none',

    '&:after': {
      content: '"▾"',
    },
  },
  arrowCollapsed: {
    transform: 'rotate(-90deg)',
  },
  arrowInvisible: {
    visibility: 'hidden',
  },

  nodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  nodeIcon: {
    margin: '0 0.2em 0',
    fontSize: '1rem',
  },
  folderIcon: {
    color: colors.warning,
  },
  fileIcon: {
    color: colors.text,
  },
  nodeIconSelected: {
    color: colors.rose,
  },
  nodeName: {
    fontWeight: 'normal',
  },
  nodeNameSelected: {
    fontWeight: 'bold',
  },

  children: {
    marginLeft: 20,
  },
  childrenCollapsed: {
    height: 0,
  },
};

const TreeView = ({ classes, children, nodeLabel, selected, onSelect, expandedByOuter, onExpand, isFile }) => {
  const Icon = isFile ? (selected ? FileIcon : FileOIcon) : FolderIcon;

  const [expandedByClick, setExpandedByClick] = useState(false);
  // Folder can be expanded manually by click, and also it's expanded if contains selected folder
  const expanded = expandedByClick || expandedByOuter;

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <CaretDownIcon
          className={cx(
            classes.arrow,
            { [classes.arrowCollapsed]: !expanded },
            { [classes.arrowInvisible]: isFile || (children.length === 0) },
          )}
          onClick={() => {
            setExpandedByClick((prevValue) => !prevValue);
            if (!expanded) {
              onExpand();
            }
          }}
        />

        <div className={classes.nodeWrapper} onClick={onSelect}>
          <Icon
            className={cx(classes.nodeIcon, { [classes.folderIcon]: !isFile, [classes.fileIcon]: isFile, [classes.nodeIconSelected]: selected })}
          />
          <span className={cx(classes.nodeName, { [classes.nodeNameSelected]: selected })}>{nodeLabel}</span>
        </div>
      </div>

      <div className={cx(classes.children, { [classes.childrenCollapsed]: !expanded })}>
        {expanded && children}
      </div>
    </div>
  );
};

TreeView.defaultProps = {
  isFile: false,
};

TreeView.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,

  nodeLabel: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  expandedByOuter: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  isFile: PropTypes.bool,
};

export default withStyles(styles)(TreeView);
