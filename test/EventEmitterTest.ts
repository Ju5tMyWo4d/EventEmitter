import * as assert from "assert";
import EventEmitter from "./EventEmitter/EventEmitter.js";

describe('EventEmitterTest', () => {
    let eventEmitter;

    beforeEach(() => {
        eventEmitter = new TestEmitter();
    });

    describe('#on()', () => {
        it('one listener', () => {
            let a = [];
            eventEmitter.on('event1', () => {a.push(1)});
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1]);
        });

        it('multiple listeners', () => {
            let a = [];
            eventEmitter.on('event1', () => {a.push(1)});
            eventEmitter.on('event1', () => {a.push(2)});
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1, 2]);
        });

        it('multiple emit one listener', () => {
            let a = [];
            eventEmitter.on('event1', () => {a.push(1)});
            eventEmitter.emit('event1');
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1, 1]);
        });

        it('multiple emit multiple listeners', () => {
            let a = [];
            eventEmitter.on('event1', () => {a.push(1)});
            eventEmitter.on('event1', () => {a.push(2)});
            eventEmitter.emit('event1');
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1, 2, 1, 2]);
        });
    });

    describe('#off()', () => {
        it('one listener', () => {
            let a = [];
            let listener = () => {a.push(1)};
            eventEmitter.on('event1', listener);
            eventEmitter.emit('event1');
            eventEmitter.off('event1', listener);
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1]);
        });

        it('multiple listeners', () => {
            let a = [];
            let listener1 = () => {a.push(1)};
            let listener2 = () => {a.push(2)};
            eventEmitter.on('event1', listener1);
            eventEmitter.on('event1', listener2);
            eventEmitter.emit('event1');
            eventEmitter.off('event1', listener2);
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1, 2, 1]);
        });
    });

    describe('#once()', () => {
        it('one listener', () => {
            let a = [];
            eventEmitter.once('event1', () => {a.push(1)});
            eventEmitter.emit('event1');
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1]);
        });

        it('multiple listeners', () => {
            let a = [];
            eventEmitter.once('event1', () => {a.push(1)});
            eventEmitter.once('event1', () => {a.push(2)});
            eventEmitter.emit('event1');
            eventEmitter.emit('event1');
            assert.deepEqual(a, [1, 2]);
        });
    });
});



interface TestEventsMap {
    event1: undefined,
}

class TestEmitter extends EventEmitter<TestEventsMap> {}