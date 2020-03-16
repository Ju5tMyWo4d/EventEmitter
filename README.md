# EventEmitter
Simple event emitter suitable for browsers.
## Showcase
```js
const myEmitter = new EventEmitter();

// listen only once
myEmitter.once('event', () => {
    console.log('1');
});

// listen until removed
myEmitter.on('event', () => {
    console.log('2');
});

let listener3 = () => {
    console.log('3');
};
myEmitter.on('event', listener3);

myEmitter.emit('event');
myEmitter.off('event', listener3);
myEmitter.emit('event');

/*
prints:
1
2
3
2
*/
```
## About
It is written in TypeScript so you can specify map interface of event types and pass it through generics (example in `/example`).

In `/dist` you can find js code transpiled from TypeScript to ES6. 
