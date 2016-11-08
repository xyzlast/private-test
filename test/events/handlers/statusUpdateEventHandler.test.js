'use strict';

const StatusUpdateEventHandler = require('../../../app/events/handlers/statusUpdateEventHandler');
const MockUser = require('./mockUser');
const assert = require('assert');

describe('StatusUpdateEventHandler Test', () => {
  it ('process - ok', () => {
    const event = {
      fromUserId: 10
    };
    const mockUserStore = {
      findByUserId: (userId) => {
        return new MockUser(userId);
      }
    };
    const result = StatusUpdateEventHandler(event, mockUserStore);
    assert.ok(!result.toUser);
    assert.ok(result.fromUser);
    assert.equal(result.fromUser.lastCalled, 'updateStatus');
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
    const result = StatusUpdateEventHandler(event, mockUserStore);
    assert.ok(!result.toUser);
    assert.ok(!result.fromUser);
  });
});
