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
                return res.sendStatus(403);
            }
            console.log("Token verified")
            req.role = payload.role
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { authenticateToken }


