const UsersData = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpStore = {};

const generate_OTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const checkAccount = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UsersData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }
        res.status(200).json({ message: 'Account exists. Proceed to reset password.' });
    } catch (e) {
        res.status(500).json({ message: 'Error checking account' });
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false,  
    port: 587,  
    tls: {
        rejectUnauthorized: false,
    }
});


const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UsersData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }
        const otp = generate_OTP();
        otpStore[email] = otp; 
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Resend OTP - Verification Code',
            text: `Your new OTP code is: ${otp}. It is valid for 10 minutes.`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Error resending OTP' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const userData = await UsersData.findOne({ email });
        if (!userData) {
            return res.status(404).json({ message: "User not found in UsersData collection." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UsersData.updateOne({ email }, { $set: { password: hashedPassword } });
        res.status(200).json({ message: "Password reset successful in UsersData collection." });
    } catch (error) {
        console.error("Reset Password Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const generateOTP =  async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UsersData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }
        const otp = generate_OTP();
        otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; 

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const verifyOTP =  (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!otpStore[email]) {
            return res.status(400).json({ message: 'OTP expired or not generated' });
        }

        const storedOtp = otpStore[email];
        console.log(`Stored OTP: ${storedOtp.otp}, Received OTP: ${otp}`);

        if (Date.now() > storedOtp.expiresAt) {
            delete otpStore[email];
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (storedOtp.otp !== String(otp)) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        delete otpStore[email];
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Error verifying OTP' });
    }
}

const login =  async (req, res) => {
    try {
        const user = await UsersData.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            department: user.department,
            skills: user.skills,
            isVerified: user.isVerified,
            isFaculty: user.isFaculty,
            notifications: user.notifications,
            
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful',token });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const createaccount = async (req, res) => {
    try {
        const { username, email, password, department, skills, role } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const existingUser = await UsersData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Extract values from skills array (if skills are provided)
        const processedSkills = skills ? skills.map(skill => skill.value) : [];

        const newUser = new UsersData({
            username,
            email,
            password: hashedPassword,
            department,
            skills: processedSkills, // Fixed skills format
            role: role || 'student',
            isFaculty: false,
            isVerified: false,
        });

        await newUser.save();

        res.status(201).json({ 
            message: 'Account created successfully.',
            user: newUser 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    checkAccount,
    resendOTP,
    resetPassword,
    generateOTP,
    verifyOTP,
    login,
    createaccount
};