'use strict';

class MockUser {
  constructor(id) {
    this.id = id;
    this.lastCalled = 'none';
  }
  follow() {
    this.lastCalled = 'follow';
  }
  unfollow() {
    this.lastCalled = 'unfollow';
  }
  sendPrivateMessage() {
    this.lastCalled = 'sendPrivateMessage';
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
