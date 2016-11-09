/*eslint no-console: ["error", { allow: ["log", "error"] }] */
'use strict';

const ConnectServer = require('./app/servers/connectServer');
const connectServer = new ConnectServer();
const UserStore = require('./app/models/userStore');

connectServer.listen(9099, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('start UserConnectServer: port(9099)');
  }
});
connectServer.on('connect-user', (userId, socket) => {
  UserStore.add(userId, socket);
});


const EventServer = require('./app/servers/eventServer');
const eventServer = new EventServer();
eventServer.listen(9090, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('start EventServer: port(9090)');
  }
});
