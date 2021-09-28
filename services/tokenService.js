const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    const obj = {
        personal: user.personal,
        expiration: dayjs().add(5, 'minutes').unix()
    }
    return jwt.sign(obj, "minimou")
}

module.exports = { createToken }