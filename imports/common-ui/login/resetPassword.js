/* global Meteor */
// import Meteor from 'meteor/meteor';
// We must NOT import Meteor, otherwise loginWithPassword is undefined!
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
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
      // TODO: perform redirect
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
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log('changed')}
        onSubmit={this.handleSubmit}
        onError={log('errors')}
        validate={this.validate}
      />
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
