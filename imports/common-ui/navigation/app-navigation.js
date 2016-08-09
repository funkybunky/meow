import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthenticatedNav } from '/imports/common-ui/navigation/AuthenticatedNav.js';
import { PublicNav } from '/imports/common-ui/navigation/PublicNav.js';

export default class AppNavigation extends React.Component {
  renderNavigation(user) {
    return user ? <AuthenticatedNav /> : <PublicNav />;
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Application Name</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderNavigation(this.props.user)}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavigation.propTypes = {
  user: React.PropTypes.object,
};
