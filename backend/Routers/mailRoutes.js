const express = require('express');
const router = express.Router();
const { sendEmail, getOutbox, getInbox } = require('../Controller/mailController');

router.post('/send', sendEmail);
router.get('/outbox/:id', getOutbox);
router.get('/inbox/:id', getInbox);

module.exports = router;
