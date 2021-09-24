const router = require('express').Router();
const bcrypt = require('bcryptjs');










//Login

/* router.post('/login', async (req, res) => {
    const user = await getByMail(req.body.email);
    if (!user) {
        return res.status(401).json({ error: "error en email y/o contraseña" });
    }
    console.log(user)
    const samePassword = bcrypt.compareSync(req.body.password, user.password);
    if (samePassword) {
        res.status(200).json({ msg: "Login correcto" });
    } else {
        res.json.status(401).json({ error: 'error en email y/o contraseña 2' });
    }
}) */

module.exports = router;