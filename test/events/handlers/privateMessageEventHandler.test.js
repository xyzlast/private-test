'use strict';

const PrivateMessageEventHandler = require('../../../app/events/handlers/privateMessageEventHandler');
const MockUser = require('./mockUser');
const assert = require('assert');

describe('PrivateMessageEventHandler Test', () => {
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
    const result = PrivateMessageEventHandler(event, mockUserStore);
    assert.ok(result.toUser);
    assert.ok(result.fromUser === null);
    assert.equal(result.toUser.lastCalled, 'receivePrivateMessage');
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
    const result = PrivateMessageEventHandler(event, mockUserStore);
    assert.ok(!result.toUser);
    assert.ok(!result.fromUser);
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
    const result = PrivateMessageEventHandler(event, mockUserStore);
    assert.ok(result.toUser);
    assert.ok(!result.fromUser);
  });
});