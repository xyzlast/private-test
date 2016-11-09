'use strict';

class EventDispatcher {
  constructor() {
    this.currentSequence = 1;
    this.events = {};
  }

  process(mazeEvent) {
    this.events[mazeEvent.sequence.toString()] = mazeEvent;
    let currentEvent = this.events[this.currentSequence];
    while (currentEvent) {
      currentEvent.process();
      delete this.events[this.currentSequence];
      this.currentSequence++;
      currentEvent = this.events[this.currentSequence];
    }
    return this.currentSequence;
  }
}

module.exports = EventDispatcher;
