import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import { Link } from 'react-router-dom';
import ReviewForm from '~/components/pages/ReviewForm';

export default () => (
  <Switch>
    <Route path="/review/form">
      <>
        <ReviewForm />
      </>
    </Route>
    <Route path="/">
      <>
        <Link to={{ pathname: '/review/form' }}>レビュー</Link>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          更新
        </button>
      </>
    </Route>
  </Switch>
);
