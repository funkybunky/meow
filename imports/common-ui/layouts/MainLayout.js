// import React, { PropTypes } from 'react';
// import { Provider } from 'react-redux';
// import store from '/imports/redux/store';

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

import React from 'react';
import { Grid } from 'react-bootstrap';
// import AppNavigation from '../containers/app-navigation';

const MainLayout = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
  },
  render() {
    return (<div>
      <Grid>
        {this.props.children}
      </Grid>
    </div>);
  },
});

export default MainLayout;
