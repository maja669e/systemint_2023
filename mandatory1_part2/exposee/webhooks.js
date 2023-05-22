import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const EVENTS_FILE = "registered_endpoints.txt"

router.post('/webhooks', (req, res) => {

  const { url, eventType} = req.body;

  // Read the existing webhooks from the file
  const webhooks = JSON.parse(fs.readFileSync(path.join(process.cwd(),EVENTS_FILE), 'utf8'));

  // Add the new webhook to the list of webhooks for the specified event
  if (!webhooks[eventType]) {
    webhooks[eventType] = [];
  }
  webhooks[eventType].push(url);

  // Write the updated webhooks list back to the file
  fs.writeFileSync(path.join(process.cwd(),EVENTS_FILE), JSON.stringify(webhooks));

  res.send(`Webhook registered for event '${eventType}': ${url}`);
});

router.delete('/webhooks/:event', (req, res) => {
  const { event } = req.params;
  const { url } = req.body;

  // Read the existing webhooks from the file
  const webhooks = JSON.parse(fs.readFileSync(path.join(process.cwd(),EVENTS_FILE), 'utf8'));

  // Remove the specified webhook from the list of webhooks for the specified event
  if (webhooks[event]) {
    webhooks[event] = webhooks[event].filter((webhook) => webhook !== url);
  }

  // Write the updated webhooks list back to the file
  fs.writeFileSync(path.join(process.cwd(),EVENTS_FILE), JSON.stringify(webhooks));

  res.status(200).send(`Webhook unregistered for event '${event}': ${url}`);
});

export default router;
