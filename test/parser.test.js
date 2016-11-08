'use strict';

describe('Parser Test', () => {
  const assert = require('assert');
  const Parser = require('../app/parser');

  function runAndCheckFunc(dataBundles, expectCount, done) {
    const parser = new Parser('\r\n');
    let itemCount = 0;
    parser.on('data-received', data => {
      itemCount++;
      if (itemCount === expectCount) {
        done();
      }
    });
    dataBundles.forEach(data => {
      parser.parse(data);
    });
  }

  it ('데이터 전송', done => {
    const dataBundles = [
      '666|F|60|50\r\n',
      '1|U|12|9\r\n',
      '542532|B\r\n',
      '43|P|32|56\r\n',
      '634|S|32\r\n',
    ];
    runAndCheckFunc(dataBundles, 5, done);
  });

  it ('데이터가 나뉘어져서 전송되는 경우', done => {
    const dataBundles = [
      '666|F|60|50\r\n1|U|12|',
      '9\r\n542532|B\r\n',
      '43|P|32|56\r\n',
      '634|S|32\r\n',
    ];
    runAndCheckFunc(dataBundles, 5, done);
  });

  it ('데이터가 한줄로 들어온 경우', done => {
    const dataBundles = [
      '666|F|60|50\r\n1|U|12|9\r\n542532|B\r\n43|P|32|56\r\n634|S|32\r\n'
    ];
    runAndCheckFunc(dataBundles, 5, done);
  });
});
