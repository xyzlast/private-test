'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = null;
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  if (!toUser) {
    return { fromUser, toUser };
  }
  toUser.receivePrivateMessage(mazeEvent.payload);
  return { fromUser, toUser };
};
