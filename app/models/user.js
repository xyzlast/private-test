'use strict';

const uuid = require('uuid').v4;
const EventEmitter = require('events').EventEmitter;

class User extends EventEmitter {
  constructor(id, socket) {
    super();    
    this.id = id;
    this.socket = socket;
    this.followUsers = [];
  }
  followTo(targetUser) {

  }
  unfollowFrom(targetUser) {

  }
  send(payload) {
    this.socket.write(payload);
  }
}

module.exports = User;