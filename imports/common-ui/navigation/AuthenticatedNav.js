import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  console.log('AuthenticatedNav - Meteor.user(): ', user);
  return user ? user.username : '';
};

export const AuthenticatedNav = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={1} href="/">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/test">
        <NavItem eventKey={2} href="/test">Test</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={userName()} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} onClick={handleLogout}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
