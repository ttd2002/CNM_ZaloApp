export function localVariable(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next();
}

