'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  if (fromUser && toUser) {
    fromUser.unfollow(toUser);
  }
  return { fromUser: fromUser, toUser: toUser };
};
