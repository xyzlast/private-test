'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = null;
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  toUser.receivePrivateMessage(mazeEvent.payload);
  return { fromUser, toUser };
};
