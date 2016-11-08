'use strict';

const _ = require('lodash');

module.exports = () => {
  const UserStore = require('../../models/userStore');
  const users = UserStore.getAll();
  _.forIn(users, (user) => {
    user.broadcastMessage();
  });
};
