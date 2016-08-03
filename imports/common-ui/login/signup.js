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
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string', title: 'Name', default: 'Jackson' },
    email: { type: 'string', title: 'Email', default: 'jackson@dude.com' },
    password: { type: 'string', title: 'Password' },
  },
};

const uiSchema = {
  password: {
    'ui:widget': 'password',
  },
};

const log = (type) => console.log.bind(console, type);

export class Signup extends React.Component {

  handleSubmit({ formData }) {
    console.log('data: ', formData);

    Accounts.createUser(formData, (error) => {
      if (error) {
        console.log('bla!', error);
        Bert.alert(error.reason, 'danger');
      } else {
        browserHistory.push('/');
        Bert.alert('Welcome!', 'success');
      }
    });
  }

  render() {
    // return <div>Hello</div>;
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log('changed')}
        onSubmit={this.handleSubmit}
        onError={log('errors')}
      />
    );
  }
}
