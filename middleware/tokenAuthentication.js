const jwt = require('jsonwebtoken');

const secretToken = "minimou";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log(req.headers)
    if (authHeader) {
        jwt.verify(token, secretToken, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.personal = payload.personal
            next();
        });
    } else {
        res.sendStatus(401);
    }
}




module.exports = { authenticateToken }


