/**
 * @template C type of context
 * @template T event_name -> event_type map
 */
export default class EventEmitter<C, T> {
    private readonly context: C;
    private readonly binds = <EventBinder<C, T>>{};

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

type EventBinder<C, T> = {[K in keyof T]: ((this: C, event: T[K]) => any)[]};