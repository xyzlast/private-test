'use strict';

const ConnectServer = require('./app/servers/connectServer');
const connectServer = new ConnectServer();

connectServer.listen(9090, (err) => {
  console.error(err);
});
connectServer.on('connect-user', (userId, socket) => {

});