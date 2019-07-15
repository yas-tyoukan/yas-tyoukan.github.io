import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '~/styles/theme';
import SamplesListPage from '~/components/pages/SamplesListPage';
import ReviewForm from '~/components/pages/ReviewForm';

const routes = (
  <Switch>
    <Route exact path="/" component={SamplesListPage} />
    <Route path="/review" component={ReviewForm} />
    <Route path="*">
      <p>404 何もないよ</p>
    </Route>
  </Switch>
);

export default () => (
  <MuiThemeProvider theme={theme}>
    <HashRouter>
      {routes}
    </HashRouter>
  </MuiThemeProvider>
);
