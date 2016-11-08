'use strict';

const EventEmitter = require('events').EventEmitter;
class MockSocket extends EventEmitter {
  constructor() {
    super();
  }
  write(data) {
    console.log(data);
    this.emit('data', data);
  }
  close() {
    this.emit('close');
  }
}
module.exports = MockSocket;
