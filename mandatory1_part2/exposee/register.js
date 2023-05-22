import exp from 'constants';
import {Router} from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const EVENTS_FILE = "registered_endpoints.txt"

// Function to save events to file
function saveEvent(event, endpoint) {
    fs.appendFileSync(path.join(process.cwd(), EVENTS_FILE), `${event}:${endpoint}\n`);
  }
  
  // Function to read events from file
  function readEvents() {
    let events = {};
    if (!fs.existsSync(path.join(process.cwd(), EVENTS_FILE))) {
      return events;
    }
    const data = fs.readFileSync(path.join(process.cwd(), EVENTS_FILE), 'utf8');
    const lines = data.trim().split('\n');

    for (const line of lines) {
      const [event, endpoint] = line.split(':');
      if (event in events) {
        events[event].push(endpoint);
      } else {
        events[event] = [endpoint];
      }
    }
    return events;
  }
  

// Endpoint to register a webhook
router.post('/register', (req, res) => {
    const { event, endpoint } = req.body;
    if (!event || !endpoint) {
      return res.status(400).json({ message: 'Missing event or endpoint' });
    }
    saveEvent(event, endpoint);
    
    return res.json({ message: `Webhook for ${event} registered with endpoint ${endpoint}` });
  });
  
  // Endpoint to unregister a webhook
  router.post('/unregister', (req, res) => {
    const { event, endpoint } = req.body;
    if (!event || !endpoint) {
      return res.status(400).json({message: 'Missing event or endpoint' });
    }

    let events = readEvents();
    if (!(event in events) || !events[event].includes(endpoint)) {
      return res.status(404).json({ message: 'Webhook not found' });
    }
    events[event] = events[event].filter(ep => ep !== endpoint);
    const data = Object.entries(events).map(([e, eps]) => eps.map(ep => `${e}:${ep}`).join('\n')).join('\n');
    fs.writeFileSync(path.join(process.cwd(), EVENTS_FILE), data);
    return res.json({ message: `Webhook for ${event} unregistered with endpoint ${endpoint}` });
  });

  export default router;