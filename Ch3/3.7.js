// Event
const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
    console.log("EVENT 1");
});

myEvent.on("event2", () => {
    console.log("EVENT 2");
});

myEvent.on("event2", () => {
    console.log("EVENT 2 ADD");
});

myEvent.once("event3", () => {
    console.log("EVENT 3");
});

myEvent.emit("event1");
myEvent.emit("event2");

myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
    console.log("EVENT 4");
});

myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
    console.log("EVENT 5");
};

myEvent.on("event5", listener);
myEvent.removeAllListeners("event5", listener);
myEvent.emit("event5");

console.log(myEvent.listenerCount("event2"));