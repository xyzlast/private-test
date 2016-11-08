'use strict';

const EventEmitter = require('events').EventEmitter;

class User extends EventEmitter {
  constructor(id, socket) {
    super();
    this.id = id;
    this.socket = socket;
    this.followedUsers = [];
  }
  followTo(targetUser) {
    targetUser.followedUsers.push(targetUser);
  }
  unfollowFrom(targetUser) {

  }
  send(payload) {
    this.socket.write(payload);
  }
}

module.exports = User;
