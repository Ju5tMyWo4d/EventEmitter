/**
 * @template T event_name -> event_type map
 * @template C type of context
 */
export default class EventEmitter<T, C = undefined> {
    private readonly context: C;
    private readonly binds = <EventBinder<T, C>>{};

    constructor(context?: C) {
        this.context = context;
    }

    on<K extends keyof T>(type: K, listener: (this: C, event: T[K]) => any) {
        if(this.binds[type] === undefined) {
            this.binds[type] = [];
        }
        this.binds[type].push(listener)
    }

    emit<K extends keyof T>(type: K, event?: T[K]) {
        for(let listener of this.binds[type]) {
            listener.call(this.context, event);
        }
    }
}

type EventBinder<T, C> = {[K in keyof T]: ((this: C, event: T[K]) => any)[]};