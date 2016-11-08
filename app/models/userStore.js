'use strict';
module.exports = (() => {
  let users = [];
  const _ = require('lodash');
  const User = require('./user');
  const EventEmitter = require('events').EventEmitter;
  const emitter = new EventEmitter();

  function add(userId, socket) {
    socket._userId = userId;
    const user = new User(userId, socket);
    users.push(user);
    socket.on('close', () => {
      _.remove(users, user => user.id === socket._userId);
    });
    emitter.emit('add-user', user);
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
    removeAll,
    on: emitter.on.bind(emitter)
  };

})();

