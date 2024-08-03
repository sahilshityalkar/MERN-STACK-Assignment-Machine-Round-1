const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Route to handle Clerk webhooks
router.post('/webhooks/clerk', webhookController.handleWebhook);

module.exports = router;