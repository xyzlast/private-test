'use strict';

describe('MazeEvent Test', () => {
  const MazeEvent = require('../../app/events/mazeEvent');
  const assert = require('assert');
  const testItems = [
    { str: '666|F|60|50', fromUserId: 60, toUserId: 50, sequence: 666, eventType: 'F' },
    { str: '1|U|12|9', fromUserId: 12, toUserId: 9, sequence: 1, eventType: 'U' },
    { str: '542532|B', fromUserId: NaN, toUserId: NaN, sequence: 542532, eventType: 'B' },
    { str: '43|P|32|56', fromUserId: 32, toUserId: 56, sequence: 43, eventType: 'P' },
    { str: '634|S|32', fromUserId: 32, toUserId: NaN, sequence: 634, eventType: 'S' }
  ];

  it ('MazeEvent Build', () => {
    testItems.forEach(item => {
      const mazeEvent = new MazeEvent(item.str);
      if (Number.isNaN(item.fromUserId)) {
        assert.ok(Number.isNaN(mazeEvent.fromUserId));
      }
      if (Number.isNaN(item.toUserId)) {
        assert.ok(Number.isNaN(mazeEvent.toUserId));
      }
      assert.equal(mazeEvent.sequence, item.sequence);
      assert.equal(mazeEvent.eventType, item.eventType);
      mazeEvent.process();
    });
  });

});
