/*eslint no-console: ["error", { allow: ["log", "error"] }] */
'use strict';

const ServerBuilder = require('./app/servers/serverBuilder');
const EventDispatcher = require('./app/events/eventDispatcher');
const config = require('./config/config');
const totalEvents = config.totalEvents;

function writeChart(percentage, sequence) {
  process.stdout.cursorTo(0);
  let chart = '\u2592';
  for (let i = 0; i < percentage; i++) {
    chart = chart + '\u2592';
  }
  process.stdout.write(`${percentage}%(seq: ${sequence})    >> ` + chart);
}

EventDispatcher.on('process-event', event => {
  const percentage = (event.sequence / totalEvents) * 100;
  if (event.sequence === 1) {
    console.log('start process event');
    console.log('====================================================');
  }  else if (event.sequence === totalEvents) {
    writeChart(percentage, event.sequence);
    console.log('');
    console.log(`all event(count: ${totalEvents}) process completed`);
    console.log('exit application');
    process.exit(0);
  } else if (percentage === parseInt(percentage)) {
    writeChart(percentage, event.sequence);
  }
});
ServerBuilder.buildEventServer(config.eventListenerPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`EventServer: port(${config.eventListenerPort}) - wait event connection`);
  }
});
ServerBuilder.buildUserServer(config.clientListenerPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`UserServer: port(${config.clientListenerPort}) - wait user connections`);
  }
});

process.on('uncaughtException', err => {
  console.error('occur uncaughtException. terminate application');
  console.error(err);
  process.exit(1);
});
