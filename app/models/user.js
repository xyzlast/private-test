'use strict';

const uuid = require('uuid').v4;
const EventEmitter = require('events').EventEmitter;

class User extends EventEmitter {
  constructor(socket) {
    this._id = uuid();
    this.socket = socket;
    this.id = null;
    this.followUsers = [];
  }
  setId(userId) {
    this.id = userId;
  }
  addFollows(followUser) {
    this.followUsers.push(followUser);
    followUser.on('unfollow', () => {
      const index = this.followUsers.indexOf(followUser);
      _.remove(this.followUsers, followedUser => {
        return followedUser.id === followUser.id;
      });
    });
  }
  send(payload) {
    this.socket.write(payload);
  }
  
      
}

module.exports = User;