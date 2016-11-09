'use strict';
module.exports = (() => {
  let users = {};
  const User = require('./user');
  const EventEmitter = require('events').EventEmitter;
  const emitter = new EventEmitter();

  function add(userId, socket) {
    socket._userId = userId;
    let user = users[userId];
    if (user) {
      if (user.socket) {
        user.socket.end();
      }
      user.socket = socket;
    } else {
      user = new User(userId, socket);
      users[user.id] = user;
      socket.on('close', () => {
        delete users[userId].socket;
      });
      emitter.emit('add-user', user);
    }
    socket.on('close', () => {
      for (let followerUserId in user.followedUsers) {
        const followedUser = user.followedUsers[followerUserId];
        delete followedUser.followUsers[userId];
      }
      delete user.socket;
    });
  }

  function findByUserId(userId) {
    let user = users[userId];
    if (!user) {
      user = new User(userId);
      users[userId] = user;
    }
    return user;
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
    removeAll,
    on: emitter.on.bind(emitter),
    removeListener: emitter.removeListener.bind(emitter)
  };

})();

