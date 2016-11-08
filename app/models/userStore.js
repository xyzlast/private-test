'use strict';

module.exports = (() => {
  let users = [];
  const _ = require('lodash');
  const User = require('./user');

  function add(userId, socket) {
    socket._userId = userId;
    users.push(new User(userId, socket));
    socket.on('close', () => {
      _.remove(users, user => user.id === socket._userId);
    });
  }

  function remove(userId) {
    _.remove(users, user => user.id === userId);
  }

  function findByUserId(userId) {
    return _(users).find(user => user.id === userId);
  }

  function getAll() {
    return users;
  }

  function removeAll() {
    users = [];
    return true;
  }

  return {
    add,
    findByUserId,
    getAll,
    remove,
    removeAll
  };

})();

