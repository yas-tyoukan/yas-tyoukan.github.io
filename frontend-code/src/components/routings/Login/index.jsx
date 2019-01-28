import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router';
import { Link } from 'react-router-dom';
import Login from '~/components/pages/Login';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login"/>
    <Route exact path="/login">
      <Login/>
    </Route>
    <Route exact path="/login/password-reminder">
      <>
        <div>id/pass = user1/p</div>
        <Link to={{ pathname: 'login' }}>ログインに戻る</Link>
      </>
    </Route>
    <Redirect from="*" to="/login"/>
  </Switch>
);
