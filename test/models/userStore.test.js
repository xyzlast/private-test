'use strict';

const assert = require('assert');
const MockSocket = require('./mockSocket');

describe('UserStore Test', () => {
  it ('사용자 추가', done => {
    const UserStore = require('../../app/models/userStore');
    UserStore.removeAll();
    UserStore.add('0026', new MockSocket());
    UserStore.add('0027', new MockSocket());
    UserStore.add('0028', new MockSocket());
    UserStore.add('0029', new MockSocket());
    UserStore.add('0030', new MockSocket());

    const users = UserStore.getAll();
    assert.equal(users.length, 5);
    done();
  });

  it ('접속종료 & 사용자 자동제거 테스트', done => {
    const UserStore = require('../../app/models/userStore');
    UserStore.removeAll();
    UserStore.add('0026', new MockSocket());
    UserStore.add('0027', new MockSocket());
    UserStore.add('0028', new MockSocket());
    UserStore.add('0029', new MockSocket());
    UserStore.add('0030', new MockSocket());

    const targetUser = UserStore.findByUserId('0026');
    targetUser.socket.close();

    const allUsers = UserStore.getAll();
    assert.equal(allUsers.length, 4);
    done();
  });
});
