import { WebSocketServer } from 'ws';

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

// Handle connection event
wss.on('connection', (ws) => {
  console.log('A new client connected');

 // Handle message event
ws.on('message', (message) => {
  const messageString = message.toString();
  console.log('Received message:', messageString);

    // Send a response to the client
    ws.send(`Server received: ${message}`);
  });

  // Handle close event
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
