'use strict';

const EventEmitter  = require('events').EventEmitter;
const net = require('net');
const Parser = require('../protocols/parser');

class ConnectServer extends EventEmitter {
  constructor() {
    super();
    this.clients = [];
  }
  listen(port, cb) {
    this.server = net.createServer(client => {
      this.bindClient(client);
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
  bindClient(client) {
    const parser = new Parser();
    client.on('data', data => {
      parser.parse(data.toString() + '\r\n');
    });
    parser.on('data-received', userId => {
      this.emit('connect-user', userId, client);
    });
  }
}

module.exports = ConnectServer;

