import { Groups } from 'imports/collections/groups.js';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const createGroup = new ValidatedMethod({
  name: 'createGroup',

  validate(args) {
    check(args, {
      name: String,
    });
  },

  run({ name }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got name:', name);
    const id = Groups.insert({
      name,
    });
    return id;
  },
});

export const updateGroup = new ValidatedMethod({
  name: 'updateGroup',

  validate(args) {
    check(args, {
      _id: String,
      name: String,
    });
  },

  run({ _id, name }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got name:', name);
    Groups.update(_id, {
      name,
    });
    return true;
  },
});

export const deleteGroup = new ValidatedMethod({
  name: 'deleteGroup',

  validate(args) {
    check(args, String); // the ID
  },

  run(id) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got id:', id);
    Groups.remove(id);
    return true;
  },
});
