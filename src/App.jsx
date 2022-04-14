// Packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

// Child components
import { LoadingIndicator, ErrorDialog } from '@cway/cway-frontend-common/components';
import LeftPanel from './components/LeftPanel';
import Gallery from './components/Gallery';

// Helper func
import { deepCopy } from '@cway/cway-frontend-common/utils';

// Styling
import withStyles from '@material-ui/core/styles/withStyles';
const styles = {
  root: {
    display: 'flex',
    height: '100vh',
  },
};

const BROADCAST = loader('@cway/cway-frontend-common/graphql/secured/queries/Broadcast.graphql');

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
  // console.groupCollapsed('LeftPanel.createTree()');
  // console.log('flatTree: ', [...flatTree]);

  const treeDataCopy = deepCopy(flatTree);

  const idMapping = treeDataCopy.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});
  // console.log('idMapping: ', { ...idMapping });

  const tree = [];
  treeDataCopy.forEach((el) => {
    el.isFile = el.__typename === 'FDFile';
    delete el.__typename;
    if (!el.isFile) el.children = el.children || [];

    // console.group('===== current element: ', { ...el });
    // console.log('parentEl: ', treeDataCopy[idMapping[el.parent]]);

    if (!el.parent) {
      // Handle the root element
      tree.push(el);
    } else {
      // Non-root element: use mapping to locate the parent element in data array
      const parentEl = treeDataCopy[idMapping[el.parent]];

      // Add current el to its parent's "children" array
      parentEl.children = [...(parentEl.children || []), el];
      // console.log('parentEl after add current element: ', treeDataCopy[idMapping[el.parent]]);
    }
    // console.log('treeDataCopy: ', [...treeDataCopy]);
    // console.groupEnd();
  });

  // console.groupEnd();

  return tree;
};

const Broadcast = ({ classes }) => {
  console.group('Broadcast()');

  // ---------- Get broadcast data from backend --------------------

  const { data: broadcastData, loading: broadcastLoading, error: broadcastError } =
    useQuery(BROADCAST, { variables: { id: '713178ea-73ef-461f-b430-fa7e28f5899f' } });
  const flatTreeData = broadcastData?.broadcast.fileDescriptor || [];

  // ---------- Nested tree hierarchy from flat tree --------------------

  const tree = createTree(flatTreeData);
  console.log('tree: ', tree);

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

  // ---------- Extract children of selected folder (as it is in tree structure) --------------------

  let childrenOfSelectedFolder = selectedItemPath.length > 0 ? tree : [];
  selectedItemPath.forEach((currentFolderId, index) => {
    childrenOfSelectedFolder = childrenOfSelectedFolder.find((topLevelFolder) => topLevelFolder.id === currentFolderId).children;
  });
  console.log('childrenOfSelectedFolder: ', childrenOfSelectedFolder);

  // ---------- Get IDs of all descendant files of selected folder --------------------

  // Recursively check children at all levels of nesting:
  // if child is file - just add it to array, if child is folder - get files of its children
  const getDescendantFileIds = (items) => items.reduce((acc, currentChild) => (
    currentChild.isFile
      ? [...acc, currentChild.id]
      : [...acc, ...getDescendantFileIds(currentChild.children)]
  ), []);
  const descendantFileIds = getDescendantFileIds(childrenOfSelectedFolder);
  console.log('descendantFileIds: ', descendantFileIds);

  // ---------- GraphQL loading and error state --------------------

  if (broadcastLoading || broadcastError) {
    console.groupEnd();
  }
  if (broadcastLoading) return <LoadingIndicator fullscreen />;
  if (broadcastError) return <ErrorDialog sentryError={broadcastError} componentName="App" />;

  // ------------------------------------------------------------

  console.groupEnd();

  return (
    <div className={classes.root}>
      <LeftPanel
        tree={tree}
        selectedItemPath={selectedItemPath}
        handleSelectItem={handleSelectItem}
      />
      <Gallery fileIds={descendantFileIds} />
    </div>
  );
};

Broadcast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Broadcast);
