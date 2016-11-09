'use strict';

const assert = require('assert');

class MockEvent {
  constructor(sequence) {
    this.sequence = sequence;
  }
  process() {
    // console.log(`process it: ${this.sequence}`);
    return this.sequence;
  }
}

describe('EventDispatcher Test', () => {
  const EventDispatcher = require('../../app/events/eventDispatcher');

  beforeEach(() => {
    EventDispatcher.clearAll();
  });

  it ('Event Process test - 랜덤', done => {
    const seqs =       [1, 3, 5, 6, 2, 4];
    const expectSeqs = [2, 2, 2, 2, 4, 7];
    for (let index = 0 ; index < seqs.length ; index++) {
      const sequence = seqs[index];
      const expectedSequence = expectSeqs[index];
      const event = new MockEvent(sequence);
      const currentSequence = EventDispatcher.process(event);
      assert.equal(expectedSequence, currentSequence);
    }
    done();
  });

  it('Event Process test - 순번대로 들어오는 경우', done => {
    const seqs = [1, 2, 3, 4, 5, 6];
    const expectSeqs = [2, 3, 4, 5, 6, 7];
    for (let index = 0; index < seqs.length; index++) {
      const sequence = seqs[index];
      const expectedSequence = expectSeqs[index];
      const event = new MockEvent(sequence);
      const currentSequence = EventDispatcher.process(event);
      assert.equal(expectedSequence, currentSequence);
    }
    done();
  });

  it('Event Process test - 역순으로 들어오는 경우', done => {
    const seqs = [6, 5, 4, 3, 2, 1];
    const expectSeqs = [1, 1, 1, 1, 1, 7];
    for (let index = 0; index < seqs.length; index++) {
      const sequence = seqs[index];
      const expectedSequence = expectSeqs[index];
      const event = new MockEvent(sequence);
      const currentSequence = EventDispatcher.process(event);
      assert.equal(expectedSequence, currentSequence);
    }
    done();
  });

  it('Event Process test - seq:1이 들어오지 않는 경우', done => {
    const seqs = [6, 5, 4, 3, 2, 7];
    const expectSeqs = [1, 1, 1, 1, 1, 1];
    for (let index = 0; index < seqs.length; index++) {
      const sequence = seqs[index];
      const expectedSequence = expectSeqs[index];
      const event = new MockEvent(sequence);
      const currentSequence = EventDispatcher.process(event);
      assert.equal(expectedSequence, currentSequence);
    }
    done();
  });
});
