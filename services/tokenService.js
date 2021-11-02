const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    const claims = {
        role: user.role,
        expiration: dayjs().add(5, 'minutes').unix()
    }
    return jwt.sign(claims, process.env.SECRET_TOKEN)
}

module.exports = { createToken }