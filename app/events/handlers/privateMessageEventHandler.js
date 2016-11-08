'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  if (!fromUser || !toUser) {
    return { fromUser, toUser };
  }
  fromUser.sendPrivateMessage(toUser);
  return { fromUser, toUser };
};
