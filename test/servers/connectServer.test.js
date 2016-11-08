'use strict';

const ConnectServer = require('../../app/servers/connectServer');
const connectServer = new ConnectServer();
const UserStore = require('../../app/models/userStore');
const net = require('net');
const assert = require('assert');
const _ = require('lodash');

describe('ConnectServer Test', () => {
  const port = 9090;
  const clients = [];
  before(done => {
    process.setMaxListeners(0);
    connectServer.listen(port, (err) => {
      if (err) {
        console.log('====================================================');
        console.error(err);
        console.log('====================================================');
      }
    });
    connectServer.on('connect-user', (userId, socket) => {
      UserStore.add(userId, socket);
    });
    done();
  });

  after(done => {
    clients.forEach(client => {
      client.end();
    });
    connectServer.close(function (err) {
      console.log('connectServer.close');
      done(err);
    });
  });
  const USER_COUNT = 100;

  it ('서버 접속 & 사용자 정보 전달', done => {
    UserStore.on('add-user', user => {
      const users = UserStore.getAll();
      let userCount = 0;
      _.forIn(users, (value, key) => {
        userCount++;
      });
      if (userCount === USER_COUNT) {
        done();
      }
    });
    for (let i = 1 ; i <= USER_COUNT ; i++) {
      const client = net.connect({ port: port, host: 'localhost' }, () => {
        const userId = i;
        client.write(userId.toString() + '\r\n');
      });
      clients.push(client);
    }
  });

  it ('접속 종료 & 사용자 제거 확인', done => {
    const client = clients.pop();
    UserStore.on('remove-user', userId => {
      const users = UserStore.getAll();
      let userCount = 0;
      _.forIn(users, (value, key) => {
        userCount++;
      });
      assert.equal(userCount, USER_COUNT - 1);
      done();
    });
    client.end(err => {
      if (err) {
        done(err);
      }
    });
  });

});

