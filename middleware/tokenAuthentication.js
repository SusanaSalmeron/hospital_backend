const jwt = require('jsonwebtoken');

const secretToken = process.env.SECRET_TOKEN;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Request reach before checking token")
    if (authHeader) {
        console.log("Token secret is " + secretToken)
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretToken, (err, payload) => {
            console.log(err)
            if (err) {
                return res.status(403).json({ error: "Invalid Token" });
            }
            console.log("Token verified")
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
        return res.status(403).json({ error: "User is not authorized" });
    }
}

module.exports = { authenticateToken, authorizeDoctor }


