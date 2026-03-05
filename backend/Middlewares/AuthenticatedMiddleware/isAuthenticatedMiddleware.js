import jwt from 'jsonwebtoken'
import { User } from '../../Models/UserModel/userSchema.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeder = req.headers.authorization;

        if (!authHeder || !authHeder.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is missing or invalid'
            })
        }

        const token = authHeder.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(400).json({
                        success: false,
                        message: 'Access Token has expired, use refreshtoken to generate again'
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: "Access token is missing or invalid"
                })
            }
            const { id } = decoded;

            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}