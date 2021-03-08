import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2ab782',
    },
    secondary: {
      main: '#5f11cb',
    },
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        color: '#f44336',
      },
    },
  },
});

export default theme;
