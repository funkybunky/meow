/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// @flow
import Thing from 'imports/features/SomeFeature/components/Thing';
import Table from 'imports/features/SomeFeature/components/table/table_container';

import { Login } from 'imports/common-ui/login/login';
import { NotFound } from 'imports/common-ui/login/not-found';
import { RecoverPassword } from 'imports/common-ui/login/recoverPassword';
import { ResetPassword } from 'imports/common-ui/login/resetPassword';
import { Signup } from 'imports/common-ui/login/signup';

// Always remember to check whether it's export or export default!

// import { mount } from 'react-mounter';
import MainLayout from '../../common-ui/layouts/MainLayout';
import Home from '../../common-ui/pages/Home';
import Perf from 'react-addons-perf';

if (process.env.NODE_ENV === 'development') {
  window.Perf = Perf;
}

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const TestParent = (props) => <div>Parent {props.children}</div>;

const TestChild = () => <div>Child</div>;

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute name="index" component={Home} onEnter={requireAuth} />
        <Route path="/test" component={TestParent} >
          <Route path="/test/all" component={TestChild} />
        </Route>
        <Route name="thing" path="/thing" component={Thing} />
        <Route name="table" path="/table" component={Table} />
        <Route name="login" path="/login" component={Login} />
        <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
        <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
        <Route name="signup" path="/signup" component={Signup} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
