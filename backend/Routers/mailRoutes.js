const express = require('express');
const router = express.Router();
const { sendEmail, getOutbox, getInbox, markAsRead } = require('../Controller/mailController');

router.post('/send', sendEmail);
router.post('/outbox', getOutbox);
router.post('/inbox', getInbox);
router.patch('/read', markAsRead);

module.exports = router;
