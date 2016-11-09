'use strict';

const FollowEventHandler = require('../../../app/events/handlers/followEventHandler');
const MockUser = require('./mockUser');
const assert = require('assert');

describe('FollowEventHandler Test', () => {
  it ('process - ok', () => {
    const event = {
      fromUserId: 10,
      toUserId: 100
    };
    const mockUserStore = {
      findByUserId: (userId) => {
        return new MockUser(userId);
      }
    };
    const result = FollowEventHandler(event, mockUserStore);
    assert.ok(result.toUser);
    assert.ok(result.fromUser);
    assert.equal(result.toUser.lastCalled, 'follow');
    assert.equal(result.fromUser.lastCalled, 'none');
  });
});
