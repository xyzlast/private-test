'use strict';

const EventEmitter = require('events').EventEmitter;
class MockSocket extends EventEmitter {
  constructor() {
    super();
  }
  write(data) {
    this.emit('data', data);
  }
  end() {
    this.emit('close');
  }
}
module.exports = MockSocket;
