'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  if (fromUser) {
    fromUser.updateStatus(mazeEvent.payload);
  }
  return { fromUser: fromUser, toUser: null };
};
