'use strict';

const EventEmitter = require('events').EventEmitter;

class Parser extends EventEmitter {
  constructor(matcher) {
    super();
    this.matcher = matcher || /\r\n/;
    this.buffer = '';
  }

  parse(data) {
    const items = (this.buffer + data.toString()).split(this.matcher);
    this.buffer = items.pop();
    items.forEach(item => {
      if (item) {
        this.emit('data-received', item);
      }
    });
  }
}

module.exports = Parser;
