/* global Meteor */
// import Meteor from 'meteor/meteor';
// We must NOT import Meteor, otherwise loginWithPassword is undefined!
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

const schema = {
  title: 'User',
  type: 'object',
  required: ['password', 'passwordRepeat'],
  properties: {
    password: { type: 'string', title: 'New Password' },
    passwordRepeat: { type: 'string', title: 'Repeat Password' },
  },
};

const uiSchema = {
  password: {
    'ui:widget': 'password',
  },
  passwordRepeat: {
    'ui:widget': 'password',
  },
};

const log = (type) => console.log.bind(console, type);

export class ResetPassword extends React.Component {

  componentWillMount() {
    if (!this.props.params && !this.props.params.token) {
      log('no token!');
      // Check is not needed actually, because React-Router expects a param
      // for this route. If it is not there, the router passes on to the
      // not-found 404 route handler. So the router does the job already.
    }
  }

  handleSubmit = ({ formData }) => {
    const { password } = formData;
    const token = this.props.params.token;
    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        log('resetPassword error: ', error);
        console.log('error resetPassword: ', error);
        Bert.alert(error.reason, 'danger');
      } else {
        browserHistory.push('/');
        Bert.alert('Password reset!', 'success');
        console.log('success!');
      }
    });
  }

  validate = (formData, errors) => {
    if (formData.password !== formData.passwordRepeat) {
      errors.passwordRepeat.addError('Passwords don\'t match');
    }
    return errors;
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={6} md={4}>
          <h4 className="page-header">Reset Password</h4>
          <Alert bsStyle="info">
           To reset your password, enter a new one below. You will be logged in
          with your new password.
          </Alert>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onChange={log('changed')}
            onSubmit={this.handleSubmit}
            onError={log('errors')}
            validate={this.validate}
          >
            <button type="submit">Recover Password</button>
          </Form>
        </Col>
      </Row>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
