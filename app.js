/*eslint no-console: ["error", { allow: ["log", "error"] }] */
'use strict';

const ServerBuilder = require('./app/servers/serverBuilder');

ServerBuilder.buildUserServer(9099, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('start UserServer: port(9099)');
  }
});
ServerBuilder.buildEventServer(9090, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('start EventServer: port(9090)');
  }
});
