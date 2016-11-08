'use strict';

const EventEmitter  = require('events').EventEmitter;
const net = require('net');
const Parser = require('../parser');

class ConnectServer extends EventEmitter {
  constructor() {
    super();
    this.parser = new Parser('\n\r');
  }
  listen(port, cb) {
    this.server = net.createServer(socket => {
      this.bindSocket(socket);
    });
    this.server.listen(port, err => {
      // NOTE: ERROR 처리는 어떻게?
      if (cb) {
        cb(err);
      }
    });
  }
  close(cb) {
    this.server.close(cb);
  }
  bindSocket(socket) {
    socket.on('data', data => {
      this.parser.parse(data);
    });
    socket.on('disconnect', () => {

    });
    this.parser.on('data-received', userId => {
      this.emit('connect-user', userId, socket);
    });
  }
}

module.exports = ConnectServer;

