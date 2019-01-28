import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router';
import ReviewForm from '~/components/pages/ReviewForm';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/top"/>
    <Route exact path="/top">
      <span>top</span>
    </Route>
    <Route path="/review-form">
      <ReviewForm/>
    </Route>
    <Route path="/*">
      <div>NOT FOUND</div>
    </Route>
  </Switch>
);
