'use strict';

module.exports = (mazeEvent, UserStore) => {
  const fromUser = UserStore.findByUserId(mazeEvent.fromUserId);
  const toUser = UserStore.findByUserId(mazeEvent.toUserId);
  fromUser.unfollow(toUser, mazeEvent.payload);
  return { fromUser: fromUser, toUser: toUser };
};
