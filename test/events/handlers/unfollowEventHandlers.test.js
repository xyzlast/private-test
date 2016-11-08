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

  it ('process - toUser 없음', () => {
    const event = {
      fromUserId: 10,
      toUserId: 100
    };
    const mockUserStore = {
      findByUserId: (userId) => {
        if (userId === event.toUserId) {
          return undefined;
        } else {
          return new MockUser(userId);
        }
      }
    };
    const result = UnfollowEventHandler(event, mockUserStore);
    assert.ok(!result.toUser);
    assert.ok(result.fromUser);
  });

  it ('process - fromUser 없음', () => {
    const event = {
      fromUserId: 10,
      toUserId: 100
    };
    const mockUserStore = {
      findByUserId: (userId) => {
        if (userId === event.fromUserId) {
          return undefined;
        } else {
          return new MockUser(userId);
        }
      }
    };
    const result = UnfollowEventHandler(event, mockUserStore);
    assert.ok(result.toUser);
    assert.ok(!result.fromUser);
  });
});
