'use strict';

const BroadcastEventHandler = require('../../../app/events/handlers/broadcastEventHandler');
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
      },
      getAll: () => {
        return {
          '10': new MockUser(10),
          '100': new MockUser(100)
        };
      }
    };
    const result = BroadcastEventHandler(event, mockUserStore);
    assert.ok(!result.toUser);
    assert.ok(!result.fromUser);
  });
});
