'use strict';
module.exports = (() => {
  let users = {};
  const _ = require('lodash');
  const User = require('./user');
  const EventEmitter = require('events').EventEmitter;
  const emitter = new EventEmitter();

  function add(userId, socket) {
    socket._userId = userId;
    const user = new User(userId, socket);
    users[user.id] = user;

    socket.on('close', () => {
      delete users[socket._userId];
      emitter.emit('remove-user', userId);
    });
    emitter.emit('add-user', user);
  }

  function remove(userId) {
    _.remove(users, user => user.id === userId);
    emitter.emit('remove-user', userId);
  }

  function findByUserId(userId) {
    return users[userId];
  }

  function getAll() {
    return users;
  }

  function removeAll() {
    users = {};
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

