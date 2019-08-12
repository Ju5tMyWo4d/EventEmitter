import EventEmitter from "../EventEmitter.js";
class ExampleEvent {
    constructor(param) {
        this.param = param;
    }
}
class Example extends EventEmitter {
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
