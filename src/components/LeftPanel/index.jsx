// Packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Child components
import TreeViewNode from '../TreeViewNode';

// Helper func
import { deepCopy } from '@cway/cway-frontend-common/utils';

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

/**
 * Create a nested folders structure (suitable for rendering) from flat tree data
 * @param flatTree [
 *   { __typename, id, name, parent },
 *   { __typename, id, name, parent },
 *   ...
 * ]
 * @returns [
 *   { id, name, children: [
 *     { id, name, isFile, children: [] },
 *     { id, name, isFile, children: [] },
 *     ...
 *   ]},
 *   ...
 * ]
 */
const createTree = (flatTree) => {
  console.groupCollapsed('LeftPanel.createTree()');
  console.log('flatTree: ', [...flatTree]);

  const treeDataCopy = deepCopy(flatTree);

  const idMapping = treeDataCopy.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});
  console.log('idMapping: ', { ...idMapping });

  const tree = [];
  treeDataCopy.forEach((el) => {
    el.isFile = el.__typename === 'FDFile';
    delete el.__typename;
    if (!el.isFile) el.children = el.children || [];

    console.group('===== current element: ', { ...el });
    console.log('parentEl: ', treeDataCopy[idMapping[el.parent]]);

    if (el.parent === undefined) {
      // Handle the root element
      tree.push(el);
    } else {
      // Non-root element: use mapping to locate the parent element in data array
      const parentEl = treeDataCopy[idMapping[el.parent]];

      // Add current el to its parent's "children" array
      parentEl.children = [...(parentEl.children || []), el];
      console.log('parentEl after add current element: ', treeDataCopy[idMapping[el.parent]]);
    }
    console.log('treeDataCopy: ', [...treeDataCopy]);
    console.groupEnd();
  });

  console.groupEnd();

  return tree;
};

const LeftPanel = ({ classes, flatTreeData }) => {
  console.group('LeftPanel');

  // ---------- Tree item selection --------------------

  const [selectedItemPath, setSelectedItemPath] = useState([]);
  console.log('selectedItemPath: ', selectedItemPath);
  const createSelectedItemPath = (selectedId) => {
    console.group(`createSelectedItemPath(${selectedId})`);
    const getParentId = (itemId) => flatTreeData.find(({ id }) => id === itemId).parent;
    const path = [selectedId];
    console.log('path: ', path);
    let pId = getParentId(selectedId);
    console.log('pId: ', pId);
    // Iterate selected folder ancestors
    while (pId) {
      path.unshift(pId);    // put parent ID at the beginning of path array
      console.log('path: ', path);
      pId = getParentId(pId);
      console.log('pId: ', pId);
    }
    console.groupEnd();
    return path;
  };
  const handleSelectItem = (id) => {
    // setValueInBrowser({ name: 'mc_selectPath', value: id, expireDate: '' });
    setSelectedItemPath(createSelectedItemPath(id));
    // onSelectFolder(id);
  };

  // ---------- Nested tree hierarchy from flat tree --------------------

  const tree = createTree(flatTreeData);
  console.log('tree: ', tree);

  const renderTreeNode = ({ id, name, isFile, children }, onSelect) => {
    console.group(`LeftPanel.renderTreeNode(): id = ${id}, name = ${name}`);
    console.log('children: ', children);
    const selected = id === selectedItemPath[selectedItemPath.length - 1];
    // Expand all ancestors of selected folder
    const expandedByOuter = selectedItemPath.slice(0, -1).some((itemId) => itemId === id);
    console.groupEnd();

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
  console.groupEnd();

  // ----------------------------------------------------------------------

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
  flatTreeData: PropTypes.arrayOf(PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.string,
  })).isRequired,
};

export default withStyles(styles)(LeftPanel);
