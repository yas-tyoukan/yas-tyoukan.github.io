import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#ff75a1',
      main: '#f23d73',
      dark: '#ba0048',
      contrastText: '#fff',
    },
    secondary: {
      light: '#6fe9f3',
      main: '#30b6c0',
      dark: '#008690',
      contrastText: '#444',
    },
  },
  breakpoints: {
    values: {
      md: 768,
      lg: 1024,
    },
  },
});
