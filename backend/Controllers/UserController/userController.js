import { User } from '../../Models/UserModel/userSchema.js';
import { verifyMail } from '../../EmailVerify/MailVerification/verifyMail.js';
import { sendOtpMail } from '../../EmailVerify/OTP/sendOTP.js';
import { Session } from '../../Models/SessionModel/sessionModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const hasedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hasedPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10m' })

        verifyMail(token, email, username)

        newUser.token = token
        await newUser.save()

        return res.status(201).json({
            success: true,
            message: 'User registed Successfully',
            data: newUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const verification = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing or invalid'
            })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            if (err.name == "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: 'The registration token has expired'
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.token = null
        user.isVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect Password'
            })
        }

        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: 'Verify your account then login'
            })
        }

        const existingSession = await Session.findOne({ userId: user._id })
        if (existingSession) {
            await Session.deleteOne({ userId: user._id })
        }

        await Session.create({ userId: user._id })

        const accesToken = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: "10d" })
        const refreshToken = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: "30d" })

        user.isLoggedIn = true;
        await user.save()

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.username}`,
            accesToken,
            refreshToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;
        await Session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()

        await sendOtpMail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const verifyOTP = async (req, res) => {
    const { otp } = req.body
    const email = req.params.email

    if (!otp) {
        return res.status(400).json({
            success: false,
            message: 'OTP is required'
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: 'OTP not generated or already verified'
            })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. please request a new one"
            })
        }
        if (otp.toString() !== user.otp.toString()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body
    const email = req.params.email
    if (!newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password do not match"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export const getUserProfile = async (req, res) => {
    try {
        // req.user humein hamare isAuthenticated middleware se mil raha hai
        const user = await User.findById(req.user._id).select("-password"); 
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User nahi mila"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const verifyToken = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Token is valid",
            user: req.user 
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};