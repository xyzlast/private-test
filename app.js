/*eslint no-console: ["error", { allow: ["log", "error"] }] */
'use strict';

const ServerBuilder = require('./app/servers/serverBuilder');
const EventDispatcher = require('./app/events/eventDispatcher');

EventDispatcher.on('process-event', event => {
  if (event.sequence === 1) {
    console.log('start - process event');
  }
  if (event.sequence === 10000000) {
    console.log('end - all event(count: 10000000) process completed');
    console.log('====================================================');
    console.log('\\o/ exit application (xyzlast@gmail.com) \\o/');
    process.exit(0);
  }
});
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
    console.log('waiting events...');
  }
});
