
const getUserByEmail = (email) => {
    const users = db.getCollection('users')
    const foundUser = users.findOne({ email: email })
    return foundUser
}

module.exports = { getUserByEmail };