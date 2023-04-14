import WebSocket from "ws";

const websocketClient = new WebSocket("ws://localhost:8080");

websocketClient.on("open", () => {
    console.log("Connected to the server");
    websocketClient.send("This is the message from a client in Node.js");
});
