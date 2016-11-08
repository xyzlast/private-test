'use strict';

const EventEmitter = require('events').EventEmitter;
class MockSocket extends EventEmitter {
  constructor() {
    super();
  }
  write(data) {
    console.log(data);
  }
  close() {
    this.emit('close');
  }
}
module.exports = MockSocket;
