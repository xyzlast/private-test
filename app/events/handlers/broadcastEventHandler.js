'use strict';

module.exports = (mazeEvent, UserStore) => {
  const users = UserStore.getAll();
  const _ = require('lodash');
  for (let userId in users) {
    const user = users[userId];
    user.broadcastMessage(mazeEvent.payload);
  }
  // _.forIn(users, user => {
  //   user.broadcastMessage(mazeEvent.payload);
  // });
  return { fromUser: null, toUser: null };
};
