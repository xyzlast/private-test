'use strict';

module.exports = (mazeEvent) => {
  const UserStore = require('../../models/userStore');
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  if (!fromUser) {
    return;
  }
  return fromUser.updateStatus();
};
