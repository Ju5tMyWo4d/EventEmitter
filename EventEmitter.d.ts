/**
 * @template C type of context
 * @template T event_name -> event_type map
 */
export default class EventEmitter<C, T> {
    private readonly context;
    private readonly binds;
    constructor(context?: C);
    on<K extends keyof T>(type: K, listener: (this: C, event: T[K]) => any): void;
    emit<K extends keyof T>(type: K, event?: T[K]): void;
}
