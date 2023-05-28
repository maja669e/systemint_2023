import WebSocket from 'ws';

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to the WebSocket server');

  // Send a message to the server
  socket.send('Hello, server!');
};

socket.onmessage = (event) => {
  console.log('Received response:', event.data);
};

socket.onclose = () => {
  console.log('Disconnected from the WebSocket server');
};
