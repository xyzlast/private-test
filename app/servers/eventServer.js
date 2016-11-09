'use strict';

const EventEmitter = require('events').EventEmitter;
const net = require('net');
const Parser = require('../protocols/parser');
const MazeEvent = require('../events/mazeEvent');
const EventDispatcher = require('../events/eventDispatcher');

class EventServer extends EventEmitter {
  constructor() {
    super();
    this.eventDispatcher = new EventDispatcher();
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
      parser.parse(data.toString());
    });
    parser.on('data-received', eventStr => {
      const event = new MazeEvent(eventStr);
      // console.log(event.toString());
      this.eventDispatcher.process(event);
    });
  }
}

module.exports = EventServer;

