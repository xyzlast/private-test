'use strict';
const Parser = require('../protocols/parser');
const UserStore = require('../models/userStore');

module.exports = (socket) => {
  const parser = new Parser();
  socket.on('data', data => {
    parser.parse(data.toString());
  });
  parser.on('data-received', userId => {
    UserStore.add(userId, socket);
  });
};
