'use strict';

const User = require('../../app/models/user');
const assert = require('assert');
const MockSocket = require('./mockSocket');
const _ = require('lodash');

describe('User Test', () => {
  const users = [];

  before(() => {
    for (let i = 0 ; i < 10 ; i++) {
      const socket = new MockSocket();
      users.push(new User((i + 1), socket));
    }
  });

  it ('Follow User (from: 3, to: 5)', done => {
    const fromUser = _.find(users, user => user.id === 3);
    const toUser = _.find(users, user => user.id === 5);

    const checkDoneFunc = function (data) {
      assert.ok(toUser.followUsers[fromUser.id]);
      assert.ok(data.indexOf('FollowUserPayload') === 0);
      toUser.socket.removeListener('data', checkDoneFunc);
      done();
    };
    toUser.socket.on('data', checkDoneFunc);
    toUser.addFollower(fromUser, 'FollowUserPayload');
  });

  it ('Unfollow User (from: 3, to: 5)', done => {
    const fromUser = _.find(users, user => user.id === 3);
    const toUser = _.find(users, user => user.id === 5);
    assert.ok(toUser.followUsers[fromUser.id]);
    fromUser.unfollow(toUser);
    assert.ok(!toUser.followUsers[fromUser.id]);
    done();
  });

  it ('send Private Message (from: 4, to: 5)', done => {
    const fromUser = _.find(users, user => user.id === 4);
    const toUser = _.find(users, user => user.id === 5);

    const checkDoneFunc = function (data) {
      toUser.socket.removeListener('data', checkDoneFunc);
      done();
    };
    toUser.socket.on('data', checkDoneFunc);
    toUser.receivePrivateMessage('payload');
  });

  it ('UpdateStatus (fromUser: 5)', done => {
    const toUser = _.find(users, user => user.id === 5);

    let receiveIndex = 0;
    let followUserCount = 0;
    users.forEach(fromUser => {
      if (fromUser.id === toUser.id) return;
      toUser.addFollower(fromUser, 'payload');
      followUserCount++;
      const checkDoneFunc = function (data) {
        assert.ok(toUser.followUsers[fromUser.id]);
        assert.equal(data.indexOf('Status Update'), 0);
        fromUser.socket.removeListener('data', checkDoneFunc);
        receiveIndex++;
        if (receiveIndex === followUserCount) {
          done();
        }
      };
      fromUser.socket.on('data', checkDoneFunc);
    });
    toUser.updateStatus('Status Update');
  });
});
