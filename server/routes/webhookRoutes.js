import express from 'express';
const router = express.Router();

// Define your webhook routes here
router.post('/webhook-endpoint', (req, res) => {
  // Handle webhook logic
  res.status(200).send('Webhook received');
});

export default router; // Export as default
