const router = require('express').Router();
const log = require('npmlog');
const { getUserByEmail } = require('../../models/users.model')
const { createToken } = require('../../services/tokenService')
const { signUp } = require('../../models/users.model')
const { validateEmail } = require('../../services/validateEmail')
const { validatePassword } = require('../../services/validatePassword')
const { addPatientToDB } = require('../../models/patients.model')


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
        const emailValidated = validateEmail(req.body.email)
        const passwordValidated = validatePassword(req.body.password)
        if (emailValidated && passwordValidated) {
            const { email, password, name } = req.body
            //signup
            const newId = signUp(email, password, name)
            if (newId) {
                addPatientToDB(newId, name, email)
                //create token
                const user = {
                    name: name,
                    role: "patient",
                    email: email,
                }
                const token = createToken(user)
                //return response
                log.info('register', 'user create successfully')
                res.status(201).json({
                    name: user.name,
                    token: token,
                    id: newId
                });
            } else {
                log.error('register', "Email already exists")
                return res.status(400).json({ error: "Email already exists" });
            }
        } else {
            log.error('register', "Email and/or password not validated")
            return res.status(400).json({ error: "Email and/or password not validated" });
        }
    } catch (err) {
        log.error('register', "Internal Error", err)
        res.status(500).json({ error: "Internal Error" })
    }

})



module.exports = router;