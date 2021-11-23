const router = require('express').Router();
const log = require('npmlog');
const { getUserByEmail } = require('../../models/users.model')
const { createToken } = require('../../services/tokenService')
const { checkValidEmail } = require('../../services/registerValidateService')
const { signUpUser } = require('../../models/users.model')


//Login

router.post('/login', (req, res) => {
    try {
        const user = getUserByEmail(req.body.email);
        if (!user) {
            log.error('login', 'Password and/or mail error')
            return res.status(401).json({ error: "Password and/or mail error" });
        }
        if (req.body.password === user.password) {
            log.info('login', 'login successfully')
            res.status(200).json({ name: user.name, token: createToken(user), id: user.id });
        } else {
            log.error('login', 'Password and/or mail error 2')
            res.status(401).json({ error: 'Password and/or mail error 2' });
        }
    } catch (err) {
        log.error('login', "Internal Error", err)
        res.status(500).json({ error: "Internal Error" })
    }
})


//Register

router.post('/register', (req, res) => {
    try {
        const foundValidUserEmail = checkValidEmail(req.body.email)
        if (foundValidUserEmail) {
            //signup
            const user = signUpUser(req.body.email, req.body.password, req.body.name)
            //create token
            const token = createToken(user)
            //return response
            log.info('register', 'user create successfully')
            res.status(201).json({ token: token, id: user.id });
        } else {
            log.error('register', "Email already exists")
            return res.status(400).json({ error: "Email already exists" });
        }
    } catch (err) {
        log.error('register', "Internal Error", err)
        res.status(500).json({ error: "Internal Error" })
    }

})



module.exports = router;