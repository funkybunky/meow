import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// @flow
import Thing from 'imports/features/SomeFeature/components/Thing';

import { Login } from 'imports/common-ui/login/login';
import { NotFound } from 'imports/common-ui/login/not-found';
import { RecoverPassword } from 'imports/common-ui/login/recoverPassword';
import { ResetPassword } from 'imports/common-ui/login/resetPassword';
import { Signup } from 'imports/common-ui/login/signup';

// Always remember to check whether it's export or export default!
import ListGroups from 'imports/features/SomeFeature/components/Thing/ListGroups.js';

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
        <Route name="groups" path="/groups" component={Thing} onEnter={requireAuth} >
          {/* <IndexRedirect to="/groups/all" /> */}
          {/* <Route name="all-groups" path="/groups/all" component={ListGroups} onEnter={requireAuth} /> */}
          <IndexRoute name="all-groups" component={ListGroups} onEnter={requireAuth} />
          {/* <Route name="new-group" path="/groups/new" component={NewGroup} onEnter={requireAuth} />
          <Route name="find-group" path="/groups/find" component={FindGroup} onEnter={requireAuth} />
          <Route name="single-group" path="/groups/:slug" component={SingleGroup} onEnter={requireAuth} /> */}
        </Route>
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
