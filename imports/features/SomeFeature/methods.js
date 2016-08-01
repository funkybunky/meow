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
    return name;
  },
});
