'use strict';

class MockUser {
  constructor(id) {
    this.id = id;
    this.lastCalled = 'none';
  }
  addFollower() {
    this.lastCalled = 'follow';
  }
  unfollow() {
    this.lastCalled = 'unfollow';
  }
  receivePrivateMessage() {
    this.lastCalled = 'receivePrivateMessage';
  }
  notify() {}
  updateStatus() {
    this.lastCalled = 'updateStatus';
  }
  broadcastMessage() {
    this.lastCalled = 'broadcastMessage';
  }
}

module.exports = MockUser;
