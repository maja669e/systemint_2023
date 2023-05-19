import express from "express";

const app = express();


app.get('/news', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');


  const newsUpdates = [
    'Breaking news: A fire is out',
    'Sports update: Denmark won',
    'Weather update: The weather will be sunny today'
  ];

  //tjekker hvilke nyheder allerede  modtaget
  const receivedUpdates = new Set();

  // sender nyheder hvert 2. sekund
  let index = 0;
  let lastUpdate = null;

  const interval = setInterval(() => {
    const currentUpdate = newsUpdates[index];

    if (currentUpdate !== lastUpdate && !receivedUpdates.has(currentUpdate)) {
      const eventData = `${currentUpdate}\n\n`;
      res.write(eventData);
      lastUpdate = currentUpdate;
      receivedUpdates.add(currentUpdate);
    }

    index = (index + 1) % newsUpdates.length;
  }, 2000);

  // Lukker min connection
  res.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});


const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
