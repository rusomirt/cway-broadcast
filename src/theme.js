/**
 * Make changes to default Material-UI theme
 */

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: { main: '#00acc1' },
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;
