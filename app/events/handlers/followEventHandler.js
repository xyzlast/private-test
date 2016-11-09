'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  if (toUser) {
    toUser.addFollower(fromUser, mazeEvent.payload);
  }
  return { fromUser, toUser };
};
