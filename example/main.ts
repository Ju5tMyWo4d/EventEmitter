import EventEmitter from "../EventEmitter.js";

class ExampleEvent {
    param: number;

    constructor(param: number) {
        this.param = param;
    }
}

interface ExampleEventsMap {
    event_1: undefined;
    event_2: ExampleEvent;
}

class Example extends EventEmitter<HTMLElement, ExampleEventsMap> {
    constructor() {
        super(document.getElementById("example"));

        this.on("event_1", () => {
            console.log(this, "event_1");
        });
        this.on("event_2", (event) => {
            console.log(event);
        });
        this.on("event_2", function (event) {
            console.log(this, event);
        });

        this.emit("event_1");
        this.emit("event_2", new ExampleEvent(2));
    }
}

new Example();