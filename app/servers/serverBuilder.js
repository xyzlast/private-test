'use strict';
const net = require('net');

class RawServer {
  listen(port, bindClientFunc, cb) {
    this.server = net.createServer(socket => {
      bindClientFunc(socket);
    });
    this.server.listen(port, err => {
      if (cb) {
        cb(err);
      }
    });
  }
  close(cb) {
    this.server.close(cb);
  }
}

function buildUserServer(port, errorCb) {
  const userServerBinder = require('./userServerBinder');
  const server = new RawServer();
  server.listen(port, userServerBinder, errorCb);
  return server;
}

function buildEventServer(port, errorCb) {
  const eventServerBinder = require('./eventServerBinder');
  const server = new RawServer();
  server.listen(port, eventServerBinder, errorCb);
  return server;
}

module.exports = {
  buildUserServer,
  buildEventServer
};
