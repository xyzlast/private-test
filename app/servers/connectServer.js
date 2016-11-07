var EventEmitter  = require('events').EventEmitter;
var net = require('net');
var Parser = require('../parser');

class ConnectServer extends EventEmitter {
  constructor() {
    super();
    this.parser = new Parser('\n\r');
  }

  listen(port, cb) {
    this.server = net.createServer(this.bindSocket);
    this.server.listen(port, err => {
      // NOTE: ERROR 처리는 어떻게?
    });
  }

  close(cb) {
    this.server.close(cb);
  }

  bindSocket(socket) {
    socket.on('data', this.parser.parse);
    socket.on('disconnect', () => {

    });
    this.parser.on('data-received', userId => {
      this.emit('connect-user', userId, socket);
    });
  }
}

module.exports = ConnectServer;

