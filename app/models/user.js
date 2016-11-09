'use strict';

const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');

class User extends EventEmitter {
  constructor(id, socket) {
    super();
    this.id = id;
    this.followUsers = {};
    this.followedUsers = {};
    this.socket = socket;
  }

  addFollower(fromUser, payload) {
    if (fromUser) {
      this.followUsers[fromUser.id] = fromUser;
      fromUser.followedUsers[this.id] = this;
    }
    this.notify(payload);
  }

  unfollow(toUser) {
    delete toUser.followUsers[this.id];
    delete this.followedUsers[toUser.id];
  }

  receivePrivateMessage(payload) {
    this.notify(payload);
  }

  notify(notification) {
    if (this.socket) {
      this.socket.write(notification + '\r\n');
    }
  }

  updateStatus(payload) {
    for (let followerId in this.followUsers) {
      const follower = this.followUsers[followerId];
      follower.notify(payload);
    }
    // _.forIn(this.followUsers, follower => {
    // });
    return this.followUsers;
  }

  broadcastMessage(payload) {
    this.notify(payload);
  }

  toString() {
    const followUserIds = [];
    _.lodash(this.followUsers, follower => {
      followUserIds.push(follower.id);
    });
    return JSON.stringify({
      id: this.id,
      followUserIds: followUserIds
    });
  }
}

module.exports = User;
