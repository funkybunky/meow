/* global Meteor */
// import Meteor from 'meteor/meteor';
// We must NOT import Meteor, otherwise loginWithPassword is undefined!
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import Form from 'react-jsonschema-form';

const schema = {
  title: 'User',
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string', title: 'Name', default: 'Jackson' },
    email: { type: 'string', title: 'Email', default: 'jackson@dude.com' },
    password: { type: 'string', title: 'Password' },
    // done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const uiSchema = {
  password: {
    'ui-widget': 'password',
  },
};

const log = (type) => console.log.bind(console, type);

export class Login extends React.Component {

  handleSubmit({ formData }) {
    console.log('data: ', formData);
    const { email, password } = formData;
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log('bla!', error);
        Bert.alert(error.reason, 'warning');
      } else {
        console.log('success');
        Bert.alert('Logged in!', 'success');

        // const { location } = component.props;
        // if (location.state && location.state.nextPathname) {
        //   browserHistory.push(location.state.nextPathname);
        // } else {
        //   browserHistory.push('/');
        // }
      }
    });
  }

  render() {
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
