'use strict';

const MazeEvent = require('../events/mazeEvent');
const Parser = require('../protocols/parser');
const EventDispatcher = require('../events/eventDispatcher');

module.exports = (socket) => {
  EventDispatcher.clearAll();
  const parser = new Parser();
  socket.on('data', data => {
    parser.parse(data.toString());
  });
  parser.on('data-received', eventStr => {
    const event = new MazeEvent(eventStr);
    EventDispatcher.process(event);
  });
};
