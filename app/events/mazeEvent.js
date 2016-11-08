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
    this.sequence = +items[0];
    this.eventType = items[1];
    this.fromUserId = null;
    this.toUserId = null;
    if (items.length === 3) {
      this.fromUserId = +items[2];
    } else if (items.length === 4) {
      this.fromUserId = +items[2];
      this.toUserId = +items[3];
    } else if (items.length !== 2) {
      throw new Error('wrong payload format!');
    }
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
    return eventHandler(this);
  }
}

module.exports = MazeEvent;
