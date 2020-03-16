export default class EventEmitter {
    constructor(context) {
        this.binds = {};
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
        let l = (event) => {
            listener.call(this.context, event);
            this.off(type, l);
        };
        this.on(type, l);
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
            let listeners = this.binds[type].slice();
            for (let listener of listeners) {
                listener.call(this.context, event);
            }
        }
    }
}
//# sourceMappingURL=EventEmitter.js.map