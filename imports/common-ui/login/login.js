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
    // done: { type: 'boolean', title: 'Done?', default: false },
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
    isLogin: true,
  }

  handleSubmit = ({ formData }) => {
    console.log('data: ', formData);
    const { email, password } = formData;
    if (this.state.isLogin) {
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

          const { location } = this.props;
          if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else {
            browserHistory.push('/');
          }
        }
      });
    } else {
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
  }

  handleLoginSignupSwitch = () => {
    this.setState({ isLogin: !this.state.isLogin, message: '' });
  }

  render() {
    return (
      <div>
        <h2>{this.state.isLogin ? 'Login' : 'Signup'}</h2>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onChange={log('changed')}
          onSubmit={this.handleSubmit}
          onError={log('errors')}
        >
          <button type="submit">{this.state.isLogin ? 'Login Now' : 'Signup Now'}</button>
        </Form>
        <button onClick={this.handleLoginSignupSwitch}>
          {this.state.isLogin
            ? 'Not signed in, yet?'
            : 'Already signed in?'}
        </button>
        {this.state.message ? <div>{this.state.message}</div> : ' '}
        {this.state.message
          ? <div>wrong password!
            <a href="/recover-password">forgot the password?</a>
          </div>
          : ' '}
      </div>
    );
  }
}
