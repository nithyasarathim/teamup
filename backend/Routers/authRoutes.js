const express = require('express');
const router = express.Router();
const {
    checkAccount,
    resendOTP,
    resetPassword,
    generateOTP,
    verifyOTP,
    login,
    createaccount
} = require('../Controller/authController');


router.patch('/reset-password',resetPassword);
router.post('/resend-otp', resendOTP);
router.post('/check-account',checkAccount);
router.post('/generate-otp',generateOTP);
router.post('/verify-otp',verifyOTP);
router.post('/login',login);
router.post('/createaccount',createaccount);
module.exports = router;