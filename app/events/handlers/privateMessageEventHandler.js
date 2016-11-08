'use strict';

module.exports = (mazeEvent) => {
  const UserStore = require('../../models/userStore');
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  if (!fromUser || !toUser) {
    return;
  }
  return fromUser.sendPrivateMessage(toUser);
};
