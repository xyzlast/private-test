'use strict';

const assert = require('assert');

class MockEvent {
  constructor(sequence) {
    this.sequence = sequence;
  }
  process() {
    console.log(`process it: ${this.sequence}`);
    return this.sequence;
  }
}

describe('EventDispatcher Test', () => {
  const EventDispatcher = require('../../app/events/eventDispatcher');

  it ('process event case 1', done => {
    const eventDispatcher = new EventDispatcher();
    const seqs =       [1, 3, 5, 6, 2, 4];
    const expectSeqs = [2, 2, 2, 2, 4, 7];

    for (let index = 0 ; index < seqs.length ; index++) {
      const sequence = seqs[index];
      const expectedSequence = expectSeqs[index];

      const event = new MockEvent(sequence);
      const currentSequence = eventDispatcher.process(event);
      assert.equal(expectedSequence, currentSequence);
    }

    done();
  });
});
