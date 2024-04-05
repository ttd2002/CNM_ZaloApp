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

