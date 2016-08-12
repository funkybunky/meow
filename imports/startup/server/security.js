import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Deny all client-side updates to user documents for security purposes
Meteor.users.deny({
  update() {
    return true;
  },
});

Accounts.onCreateUser((options, user) => {
  /*
   * The official Meteor Guide recommends not storing things in user.profile. So
   * this will mutate any newly created user and just put profile information at
   * the root level which is recommended. So when using Accounts.createUser,
   * go ahead and use profile, and this will handle fixing it.
   *
   * Reference: http://guide.meteor.com/accounts.html#dont-use-profile
   */
  const returnUser = { ...user, ...options.profile };
  returnUser.myGroups = [];
  console.log('onCreateUser hook. options: ',
    JSON.stringify(options, null, 2), 'user: ',
    JSON.stringify(user, null, 2), 'returning user obj: ',
    JSON.stringify(returnUser, null, 2));
  return returnUser;
});
