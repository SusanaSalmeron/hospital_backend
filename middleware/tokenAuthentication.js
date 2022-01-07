const jwt = require('jsonwebtoken');
const log = require('npmlog')

const secretToken = process.env.SECRET_TOKEN;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    log.verbose("Request reach before checking token")
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretToken, (err, payload) => {
            if (err) {
                log.error(err)
                return res.status(403).json({ error: "Invalid Token" });
            }
            log.info("Token verified")
            req.role = payload.role
            next();
        });
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

const authorizeDoctor = (req, res, next) => {
    const role = req.role
    if (role === "sanitario") {
        next()
    } else {
        log.error('User is not authorized')
        return res.status(403).json({ error: "User is not authorized" });
    }
}

module.exports = { authenticateToken, authorizeDoctor }


