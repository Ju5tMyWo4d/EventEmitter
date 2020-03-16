/**
 * @template T - map of (event name => type of event param in listener)
 * @template [C] - type of context for listeners, if not specified context is set to this EventEmitter
 */
export default class EventEmitter<T, C = undefined> {
    private readonly context: C | this;
    private readonly binds = <EventBinder<T, C>>{};
    private readonly bindsOnce = <EventBinder<T, C>>{};

    /**
     * @param [context=this] - context for listeners
     */
    constructor(context?: C) {
        this.context = context ? context : this;
    }

    /**
     * Adds the listener function to the end of the listeners array for the event.
     * @param type
     * @param listener
     * @return this
     */
    on<K extends keyof T>(type: K, listener: EventListener<T, K, C>): this {
        if(this.binds[type] === undefined) {
            this.binds[type] = [];
        }
        this.binds[type].push(listener);

        return this;
    }

    /**
     * Adds the listener function to the end of the listeners array for the event that triggers only once.
     * @param type
     * @param listener
     * @return this
     */
    once<K extends keyof T>(type: K, listener: EventListener<T, K, C>): this {
        if(this.bindsOnce[type] === undefined) {
            this.bindsOnce[type] = [];
        }
        this.bindsOnce[type].push(listener);

        return this;
    }

    /**
     * Deletes the first occurrence of listener function of type or deletes all listeners of type if listener is undefined.
     * @param type
     * @param [listener]
     * @return this
     */
    off<K extends keyof T>(type: K, listener?: EventListener<T, K, C>): this {
        if(listener === undefined) {
            delete this.binds[type];
        } else {
            this.binds[type].splice(this.binds[type].indexOf(listener), 1);
        }

        return this;
    }

    /**
     * Emits event of specified type and pass event of type specified in map (can be undefined).
     * @param type
     * @param [event]
     */
    emit<K extends keyof T>(type: K, event?: T[K]) {
        for(let listener of this.binds[type]) {
            listener.call(this.context, event);
        }

        let onceEvents = this.bindsOnce[type];
        delete this.bindsOnce[type];
        for(let listener of onceEvents) {
            listener.call(this.context, event);
        }
    }
}

type EventBinder<T, C> = {[K in keyof T]: EventListener<T, K, C>[]};
type EventListener<T, K extends keyof T, C> = (this: C | EventEmitter<T, C>, event?: T[K]) => any;