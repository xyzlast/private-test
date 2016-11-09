'use strict';

// class EventDispatcher {
//   constructor() {
//     this.currentSequence = 1;
//     this.events = {};
//   }

//   process(mazeEvent) {
//     this.events[mazeEvent.sequence.toString()] = mazeEvent;
//     let currentEvent = this.events[this.currentSequence];
//     while (currentEvent) {
//       currentEvent.process();
//       delete this.events[this.currentSequence];
//       this.currentSequence++;
//       currentEvent = this.events[this.currentSequence];
//     }
//     return this.currentSequence;
//   }
// }

// module.exports = EventDispatcher;

module.exports = (() => {
  let currentSequence = 1;
  let events = {};
  const EventEmitter = require('events').EventEmitter;
  const emitter = new EventEmitter();
  function process(mazeEvent) {
    emitter.emit('add-event', mazeEvent);
    events[mazeEvent.sequence.toString()] = mazeEvent;
    let currentEvent = events[currentSequence];
    while (currentEvent) {
      emitter.emit('process-event', currentEvent);
      currentEvent.process();
      delete events[currentSequence];
      currentSequence++;
      currentEvent = events[currentSequence];
    }
    return currentSequence;
  }
  function clearAll() {
    currentSequence = 1;
    events = {};
  }
  return {
    process,
    clearAll,
    on: emitter.on.bind(emitter),
    removeListener: emitter.removeListener.bind(emitter)
  };
})();
