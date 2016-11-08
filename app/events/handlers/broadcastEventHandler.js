'use strict';

const _ = require('lodash');

module.exports = (mazeEvent, UserStore) => {
  const users = UserStore.getAll();
  _.forIn(users, (user) => {
    user.broadcastMessage();
  });
  return { fromUser: null, toUser: null };
};
