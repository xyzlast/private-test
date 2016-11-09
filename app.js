'use strict';

const ConnectServer = require('./app/servers/connectServer');
const connectServer = new ConnectServer();
const UserStore = require('./app/models/userStore');

connectServer.listen(9099, (err) => {
  console.error(err);
});
connectServer.on('connect-user', (userId, socket) => {
  UserStore.add(userId, socket);
});


const EventServer = require('./app/servers/eventServer');
const eventServer = new EventServer();
eventServer.listen(9090, (err) => {
  console.error(err);
});
