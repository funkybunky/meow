import { createContainer } from 'meteor/react-meteor-data';
import { createGroup as _createGroup } from '../../methods';

import Thing from './Thing';
export default createContainer(() => {
  // Maybe write a higher-order function for this later
  const createGroup = (args, callback) => {
    _createGroup.call(args, callback);
  };

  return {
    meteorData: 'goes here',
    createGroup,
  }
}, Thing)
