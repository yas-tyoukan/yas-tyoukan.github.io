import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core';

import '~/styles/main.less';
import theme from '~/styles/theme';
import configureStore from '~/configureStore';

const Wrapper = ({ rootReducer, children }) => {
  const history = createBrowserHistory();
  const store = configureStore({}, rootReducer, history);
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

Wrapper.propTypes = {
  rootReducer: PropTypes.shape({}),
  children: PropTypes.node,
};

Wrapper.defaultProps = {
  rootReducer: {},
  children: null,
};

export default Wrapper;
