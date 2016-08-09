/* global Meteor */
// import Meteor from 'meteor/meteor';
// We must NOT import Meteor, otherwise loginWithPassword is undefined!
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import { Accounts } from 'meteor/accounts-base';

const schema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string', title: 'Email' },
  },
};

const log = (type) => console.log.bind(console, type);

export class RecoverPassword extends React.Component {

  handleSubmit = ({ formData }) => {
    Accounts.forgotPassword({
      email: formData.email,
    }, (error) => {
      if (error) {
        console.log('error: ', error);
        Bert.alert(error.reason, 'warning');
      } else {
        console.log('success');
        Bert.alert('Check your inbox for a reset link!', 'success');
      }
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={6} md={4}>
          <h4 className="page-header">Recover Password</h4>
          <Alert bsStyle="info">
            Enter your email address below to receive a link to reset your password.
          </Alert>
          <Form
            schema={schema}
            onChange={log('changed')}
            onSubmit={this.handleSubmit}
            onError={log('errors')}
          >
            <button type="submit">Recover Password</button>
          </Form>
        </Col>
      </Row>
    );
  }
}
