import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import Thing from 'imports/features/SomeFeature/components/Thing';

import { Login } from 'imports/common-ui/login/login';
import { NotFound } from 'imports/common-ui/login/not-found';
import { RecoverPassword } from 'imports/common-ui/login/recover-password';
import { ResetPassword } from 'imports/common-ui/login/reset-password';
import { Signup } from 'imports/common-ui/login/signup';

// import { FlowRouter } from 'meteor/kadira:flow-router';
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

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute name="index" component={Home} onEnter={requireAuth} />
        <Route name="thing" path="/thing" component={Thing} onEnter={requireAuth} />
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

// FlowRouter.route('/', {
//   name: 'home',
//   action() {
//     mount(MainLayout, { content: () => <Home /> });
//   },
// });
