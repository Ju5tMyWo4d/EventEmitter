/**
 * @template C type of context
 * @template T event_name -> event_type map
 */
export default class EventEmitter {
    constructor(context) {
        this.binds = {};
        this.context = context;
    }
    on(type, listener) {
        if (this.binds[type] === undefined) {
            this.binds[type] = [];
        }
        this.binds[type].push(listener);
    }
    emit(type, event) {
        for (let listener of this.binds[type]) {
            listener.call(this.context, event);
        }
    }
}
