'use strict';

const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');

class User extends EventEmitter {
  constructor(id, socket) {
    super();
    this.id = id;
    this.socket = socket;
    this.followUsers = {};
    this.followedUsers = {};
    this.socket.on('close', () => {
      _.forIn(this.followedUsers, followedUser => {
        delete followedUser.followUsers[this.id];
      });
    });
  }

  follow(toUser) {
    if (!toUser) return;
    toUser.followUsers[this.id] = this;
    this.followedUsers[toUser.id] = toUser;
    toUser.notify(`Follow: User(${this.id}) is follow to you`);
  }

  unfollow(toUser) {
    if (!toUser) return;
    delete toUser.followUsers[this.id];
    delete this.followedUsers[toUser.id];
  }

  sendPrivateMessage(toUser) {
    if (!toUser) return;
    const message = `Private Message: receive Private Message from User(${this.id})`;
    toUser.notify(message);
    return message;
  }

  notify(notification) {
    this.socket.write(notification);
  }

  updateStatus() {
    _.forIn(this.followUsers, (follower) => {
      follower.notify('Status Update: UpdateStatus');
    });
    return this.followUsers;
  }

  broadcastMessage() {
    this.notify('Broadcast: received Broadcast Message');
  }

  toString() {
    const followUserIds = [];
    _.forIn(this.followUsers, (follower) => {
      followUserIds.push(follower.id);
    });
    return JSON.stringify({
      id: this.id,
      followUserIds: followUserIds
    });
  }
}

module.exports = User;
