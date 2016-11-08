'use strict';

const ConnectServer = require('../../app/servers/connectServer');
const connectServer = new ConnectServer();
const UserStore = require('../../app/models/userStore');
const net = require('net');
const assert = require('assert');

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

  it ('서버 접속 & 사용자 정보 전달', done => {
    const maxUserCount = 10;
    UserStore.on('add-user', user => {
      if (UserStore.getAll().length === maxUserCount) {
        done();
      }
    });
    for (let i = 0 ; i <= maxUserCount ; i++) {
      const client = net.connect({ port: port, host: 'localhost' }, () => {
        client.write((i + 1).toString() + '\r\n');
      });
      clients.push(client);
    }
  });


});

