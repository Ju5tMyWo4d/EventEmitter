export default class EventEmitter {
    constructor(context) {
        this.binds = {};
        this.bindsOnce = {};
        this.context = context ? context : this;
    }
    on(type, listener) {
        if (this.binds[type] === undefined) {
            this.binds[type] = [];
        }
        this.binds[type].push(listener);
        return this;
    }
    once(type, listener) {
        if (this.bindsOnce[type] === undefined) {
            this.bindsOnce[type] = [];
        }
        this.bindsOnce[type].push(listener);
        return this;
    }
    off(type, listener) {
        if (listener === undefined) {
            delete this.binds[type];
        }
        else {
            if (this.binds[type].includes(listener)) {
                this.binds[type].splice(this.binds[type].indexOf(listener), 1);
            }
        }
        return this;
    }
    emit(type, event) {
        if (this.binds[type] !== undefined) {
            for (let listener of this.binds[type]) {
                listener.call(this.context, event);
            }
        }
        if (this.bindsOnce[type] !== undefined) {
            let onceEvents = this.bindsOnce[type];
            delete this.bindsOnce[type];
            for (let listener of onceEvents) {
                listener.call(this.context, event);
            }
        }
    }
}
//# sourceMappingURL=EventEmitter.js.map