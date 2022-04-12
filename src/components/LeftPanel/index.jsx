// Packages
import React from 'react';
import PropTypes from 'prop-types';

// Child components
import TreeViewNode from '../TreeViewNode';

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
    padding: 5,
    flex: 1,
  },
  treeWrapper: {
    flex: 1,
    overflowY: 'auto',
  },
};

const LeftPanel = ({ classes, tree, selectedItemPath, handleSelectItem }) => {
  const renderTreeNode = ({ id, name, isFile, children }, onSelect) => {
    // console.group(`LeftPanel.renderTreeNode(): id = ${id}, name = ${name}`);
    // console.log('children: ', children);
    const selected = id === selectedItemPath[selectedItemPath.length - 1];
    // Expand all ancestors of selected folder
    const expandedByOuter = selectedItemPath.slice(0, -1).some((itemId) => itemId === id);
    // console.groupEnd();

    return (
      <TreeViewNode
        nodeLabel={name}
        selected={selected}
        onSelect={() => onSelect(id)}
        expandedByOuter={expandedByOuter}
        isFile={isFile}
        showFiles={false}
        key={id}
      >
        {children ? children.map((childFolder) => renderTreeNode(childFolder, onSelect)) : []}
      </TreeViewNode>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.panel}>
        <div className={classes.treeWrapper}>
          {(tree.length > 0) ? tree.map((highLevelFolder) => renderTreeNode(highLevelFolder, handleSelectItem)) : null}
        </div>
      </div>
    </div>
  );
};

LeftPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  tree: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
    children: PropTypes.array,
  })).isRequired,
  selectedItemPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(LeftPanel);
