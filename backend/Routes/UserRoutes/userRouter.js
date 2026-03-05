import express from 'express'
import {
    changePassword,
    forgotPassword,
    loginUser,
    logoutUser,
    registerUser,
    verification,
    verifyOTP,
    getUserProfile,
    verifyToken
} from '../../Controllers/UserController/userController.js'
import { isAuthenticated } from '../../Middlewares/AuthenticatedMiddleware/isAuthenticatedMiddleware.js'
import { userSchema, validateUser } from '../../Validator/useValidate.js'

const router = express.Router()

router.post('/register',validateUser(userSchema), registerUser)
router.post('/verify', verification)
router.get('/verify-token', isAuthenticated, verifyToken);
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)
router.get('/profile', isAuthenticated, getUserProfile);

export default router