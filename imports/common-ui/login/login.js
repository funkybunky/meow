/* global Meteor */
// import Meteor from 'meteor/meteor';
// We must NOT import Meteor, otherwise loginWithPassword is undefined!
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import Form from 'react-jsonschema-form';
import { browserHistory } from 'react-router';

const schema = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
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

export class Login extends React.Component {

  static propTypes = {
    location: React.PropTypes.object,
  }

  state = {
    message: '',
  }

  handleSubmit = ({ formData }) => {
    // console.log('handleSubmit formData: ', formData);
    const { email, password } = formData;
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log('bla!', error);
        Bert.alert(error.reason, 'warning');
        this.setState({
          message: 'wrong password! forgot the password? or not signed up, yet?',
        });
      } else {
        console.log('success');
        Bert.alert('Logged in!', 'success');
        this.setState({
          message: 'successfully logged in!',
        });

        const { location } = this.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onChange={log('changed')}
          onSubmit={this.handleSubmit}
          onError={log('errors')}
        >
          <button type="submit">Login Now</button>
          <div>
            <a href="/signup">Not signed up, yet?</a>
          </div>
          <div>
            <a href="/recover-password">Forgot your password?</a>
          </div>
        </Form>
        {this.state.message ? <div>{this.state.message}</div> : ' '}
      </div>
    );
  }
}
