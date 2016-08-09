// import React, { PropTypes } from 'react';
// import { Provider } from 'react-redux';
// import store from 'imports/redux/store';

// const MainLayout = ({ content }) => {
// const MainLayout = () => {
//   // return <Provider store={store}>
//   //   {content()}
//   // </Provider>
//   return (<div> MainLayout
//     {/* {content()} */}
//     {this.props.children}
//   </div>);
// };

// MainLayout.propTypes = {
//   content: PropTypes.func.isRequired,
// };

// export default MainLayout;

// --------------------

/* global Meteor */

import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '/imports/common-ui/navigation/app-navigation';

export default class MainLayout extends Component {

  static propTypes = {
    children: React.PropTypes.element,
  }

  render() {
    return (
      <div>
        {Meteor.user() ? 'user!' : 'no user'}
        <AppNavigation user={Meteor.user()} />
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}
