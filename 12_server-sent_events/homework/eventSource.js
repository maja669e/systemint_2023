const eventSource = new EventSource('/news');
let lastUpdate = null;

// Handle SSE events
eventSource.onmessage = function(event) {
  const currentUpdate = event.data;
  
  // Only display the update if it's different from the last one
  if (currentUpdate !== lastUpdate) {
    console.log('Received event:', currentUpdate);
    lastUpdate = currentUpdate;
  }
};

// Close the SSE connection after 10 seconds (optional)
setTimeout(function() {
  eventSource.close();
}, 10000);