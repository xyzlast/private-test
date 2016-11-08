'use strict';

const EventEmitter = require('events').EventEmitter;
const assert = require('assert');

class Parser extends EventEmitter {
  constructor(matcher) {
    super();
    assert.ok(matcher, 'matcher is not null or undefined');
    this.matcher = matcher;
    this.buffer = '';
  }

  parse(data) {
    const items = (this.buffer + data.toString()).split(this.matcher);
    this.buffer = items.pop();
    items.forEach(item => {
      this.emit('data-received', item);
    });
  }
}

module.exports = Parser;
