const router = require('express').Router();
const bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');
const { getUserByEmail } = require('../../models/users.model')
const { createToken } = require('../../services/tokenService')

//Login

router.post('/login', (req, res) => {
    const user = getUserByEmail(req.body.email);
    if (!user) {
        return res.status(401).json({ error: "error en email y/o contraseña" });
    }

    if (req.body.password === user.password) {
        res.status(200).json({ name: user.nombre, token: createToken(user) });
    } else {
        res.status(401).json({ error: 'error en email y/o contraseña 2' });
    }
})

module.exports = router;