'use strict';

const EventTypes = {
  FOLLOW: 'F',
  UNFOLLOW: 'U',
  BROADCAST: 'B',
  PRIVATE_MESSAGE: 'P',
  STATUS_UPDATE: 'S'
};

const FollowEventHandler = require('./handlers/followEventHandler');
const UnfollowEventHandler = require('./handlers/unfollowEventHandler');
const BroadcastEventHandler = require('./handlers/broadcastEventHandler');
const PrivateMessageEventHandler = require('./handlers/privateMessageEventHandler');
const StatusUpdateEventHandler = require('./handlers/statusUpdateEventHandler');

class MazeEvent {

  constructor(payload) {
    const items = payload.split('|');
    this.payload = payload;
    this.sequence = +items[0];
    this.eventType = items[1];
    this.fromUserId = +items[2];
    this.toUserId = +items[3];
  }

  toString() {
    const strObj = {
      sequence: this.sequence,
      eventType: this.eventType,
      fromUserId: this.fromUserId,
      toUserId: this.toUserId,
    };
    return JSON.stringify(strObj);
  }

  process() {
    let eventHandler = null;
    switch (this.eventType) {
    case EventTypes.FOLLOW:
      eventHandler = FollowEventHandler;
      break;
    case EventTypes.UNFOLLOW:
      eventHandler = UnfollowEventHandler;
      break;
    case EventTypes.BROADCAST:
      eventHandler = BroadcastEventHandler;
      break;
    case EventTypes.PRIVATE_MESSAGE:
      eventHandler = PrivateMessageEventHandler;
      break;
    case EventTypes.STATUS_UPDATE:
      eventHandler = StatusUpdateEventHandler;
      break;
    default:
      throw new Error('Wrong Event Type!');
    }
    const UserStore = require('../models/userStore');
    return eventHandler(this, UserStore);
  }
}

module.exports = MazeEvent;
