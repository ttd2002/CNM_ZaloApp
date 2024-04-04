import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export function localVariable(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next();
}


export async function authenticateToken(req, res, next) {//middleware to authenticate token and check if user is logged in
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // console.log('Token:', token);
    // console.log('AuthHeader:', authHeader);

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is missing.' });

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userID);
        // console.log('Decoded:', decoded);
        // console.log('User:', req.user);

        if (!req.user) {
            return res.status(401).json({ error: 'Access denied. Invalid token.' });
        }

        next();
    } catch (error) {
        console.error('Error authenticating token:', error.message);
        return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }
};

