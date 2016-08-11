import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router';

import { Bert } from 'meteor/themeteorchef:bert';
import Form from 'react-jsonschema-form';

const schema = {
  title: 'Create new Group',
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string', title: 'Group Name', default: 'Yogi Masters' },
  },
};

const uiSchema = {
};

const log = (type) => console.log.bind(console, type);

class GroupsNew extends Component {

  handleSubmit = ({ formData }) => {
    this.props.createGroup(formData, (err) => {
      if (err) {
        log('error')(err);
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert(`Successfully created group ${formData.name}`, 'success');
        browserHistory.push('/groups');
        // TODO: redirect to group detail page, right?
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

// const styles = {
//   root: {
//     display: 'inline',
//   },
//   button: {
//     background: '#eee',
//     border: '1px solid #ddd',
//     fontSize: 24,
//   },
// };

GroupsNew.propTypes = {
  groups: React.PropTypes.array, // are needed to check for existing ones
  createGroup: React.PropTypes.func, // callback to method
};

export default Radium(GroupsNew);
