'use strict';

module.exports = (mazeEvent, UserStore) => {
  const users = UserStore.getAll();
  for (let userId in users) {
    const user = users[userId];
    user.broadcastMessage(mazeEvent.payload);
  }
  return { fromUser: null, toUser: null };
};
