export default class EventEmitter<T, C = undefined> {
    private readonly context;
    private readonly binds;
    private readonly bindsOnce;
    constructor(context?: C);
    on<K extends keyof T>(type: K, listener: EventListener<T, K, C>): this;
    once<K extends keyof T>(type: K, listener: EventListener<T, K, C>): this;
    off<K extends keyof T>(type: K, listener?: EventListener<T, K, C>): this;
    emit<K extends keyof T>(type: K, event?: T[K]): void;
}
declare type EventListener<T, K extends keyof T, C> = (this: C | EventEmitter<T, C>, event?: T[K]) => any;
export {};
