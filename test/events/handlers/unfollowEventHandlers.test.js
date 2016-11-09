'use strict';

const UnfollowEventHandler = require('../../../app/events/handlers/unfollowEventHandler');
const MockUser = require('./mockUser');
const assert = require('assert');

describe('UnfollowEventHandler Test', () => {
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
    const result = UnfollowEventHandler(event, mockUserStore);
    assert.ok(result.toUser);
    assert.ok(result.fromUser);
    assert.equal(result.toUser.lastCalled, 'none');
    assert.equal(result.fromUser.lastCalled, 'unfollow');
  });
});
