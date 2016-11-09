'use strict';

const UserServerBinder = require('../../app/servers/userServerBinder');
const MockSocket = require('../models/mockSocket');
const UserStore = require('../../app/models/userStore');
const assert = require('assert');

describe('UserServerBinder Test', () => {
  it ('사용자 ID 전송', (done) => {
    const socket = new MockSocket();
    UserServerBinder(socket);
    UserStore.on('add-user', user => {
      assert.ok(user);
      assert.equal(user.id, '001');
      assert.ok(user.socket);
      done();
    });
    socket.write('001\r\n');
  });
});
