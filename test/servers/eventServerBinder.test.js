'use strict';

const EventServerBinder = require('../../app/servers/eventServerBinder');
const EventDispatcher = require('../../app/events/eventDispatcher');
const MockSocket = require('../models/mockSocket');
const assert = require('assert');

describe('EventServerBinder Test', () => {
  it ('메세지 전송 테스트', done => {
    const dataBundles = [
      '666|F|60|50\r\n',
      '1|U|12|9\r\n',
      '542532|B\r\n',
      '43|P|32|56\r\n',
      '634|S|32\r\n',
    ];
    let eventCount = 0;
    const addEventFunc = (mazeEvent) => {
      eventCount++;
      if (eventCount === dataBundles.length) {
        EventDispatcher.removeListener('add-event', addEventFunc);
        done();
      }
    };
    EventDispatcher.on('add-event', addEventFunc);
    const socket = new MockSocket();
    EventServerBinder(socket);
    dataBundles.forEach(data => {
      socket.write(data);
    });
  });
});

