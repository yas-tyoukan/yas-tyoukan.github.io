import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from '~/components/routings/Wrapper';
import App from '~/components/routings/App';

ReactDOM.render(
  <Wrapper rootReducer={{}}>
    <App />
  </Wrapper>,
  document.getElementById('root'),
);
