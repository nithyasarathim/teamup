const express = require('express');
const router = express.Router();
const {requestNotify, acceptNotify, RejectNotify} = require('../Controller/notifyController');

router.post('/request/:id', requestNotify);
router.post('/accept/:id', acceptNotify);
router.post('/reject/:id', RejectNotify);

module.exports = router;