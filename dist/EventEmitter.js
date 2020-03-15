export default class EventEmitter {
    constructor(context) {
        this.binds = {};
        this.bindsOnce = {};
        this.context = context;
    }
    on(type, listener) {
        if (this.binds[type] === undefined) {
            this.binds[type] = [];
        }
        this.binds[type].push(listener);
    }
    once(type, listener) {
        if (this.bindsOnce[type] === undefined) {
            this.bindsOnce[type] = [];
        }
        this.bindsOnce[type].push(listener);
    }
    emit(type, event) {
        for (let listener of this.binds[type]) {
            listener.call(this.context, event);
        }
        for (let listener of this.bindsOnce[type]) {
            listener.call(this.context, event);
        }
        delete this.bindsOnce[type];
    }
}
//# sourceMappingURL=EventEmitter.js.map