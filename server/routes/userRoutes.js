const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middlewares/authmiddleware');
const EmailHelper = require('../utils/emailSender');

const router = express.Router();
require('dotenv').config();

// Function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.send({
                success: false,
                message: "User already exists",
                data: userExists
            });
        }

        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword);
        req.body.password = hashedPassword;

        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.send({
                success: false,
                message: "User not found",
                data: user
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.send({
                success: false,
                message: "Invalid password",
                data: user
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.send({
            success: true,
            message: "User logged in successfully",
            data: {
                token: token
            }
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Router-level-middleware for user profile
router.get('/get-current-user', authmiddleware, async (req, res) => {
    const user = await User.findById(req.body.userId).select('-password -otp -otpExpiry');

    res.send({
        success: true,
        message: "You are authorized to go to the protected route",
        data: user
    })
})

// Route to update user profile
router.put('/update-profile', async (req, res) => {
    try {
        const {name, email, userType} = req.body;
        const userId = req.body.userId;

        const user = await User.findByIdAndUpdate(userId, {name, email, userType}, {new: true});

        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
                data: user
            });
        }

        res.send({
            success: true,
            message: "User profile updated successfully",
            data: user
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route for forget password
router.post('/forget-password', async function(req, res) {
    try {
        if (req.body.email === undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget password"
            })
        }

        let user = await User.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        res.status(200).json({
            status: "success",
            message: "OTP sent successfully",
            data: user
        });

        await EmailHelper("otp.html", user.email, { name: user.name, otp: otp });
    }
    catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

// Route for reset password
router.post('/reset-password', async function(req, res) {
    try {
        let resetDetails = req.body;
        if (!resetDetails.password || !resetDetails.otp || !resetDetails.email) {
            return res.status(400).json({
                status: "failure",
                message: "Please enter all the details"
            })
        }

        const user = await User.findOne({ otp : req.body.otp });
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "Invalid request"
            })
        }

        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "OTP expired"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            status: "success",
            message: "Password reset successfully",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

module.exports = router;