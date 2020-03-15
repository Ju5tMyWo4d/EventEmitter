export default class EventEmitter<T, C = undefined> {
    private readonly context;
    private readonly binds;
    private readonly bindsOnce;
    constructor(context: C);
    on<K extends keyof T>(type: K, listener: (this: C, event?: T[K]) => any): void;
    once<K extends keyof T>(type: K, listener: (this: C, event?: T[K]) => any): void;
    emit<K extends keyof T>(type: K, event?: T[K]): void;
}
