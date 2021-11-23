const { validateEmail } = require('../services/validateEmail')
const { validatePassword } = require('../services/validatePassword')

let userId = 10040

const getUserByEmail = (email) => {
    const users = db.getCollection('users')
    const foundUser = users.findOne({ email: email })
    return foundUser
}

const signUpUser = (userEmail, userPassword, userName) => {
    const emailValidated = validateEmail(userEmail)
    const passwordValidated = validatePassword(userPassword)
    if (emailValidated && passwordValidated) {
        const usersTable = db.getCollection('users')
        usersTable.insert({
            name: userName,
            password: userPassword,
            email: userEmail,
            role: "patient",
            id: userId++
        })
        return { result: true }
    }
    return { result: false }
}

module.exports = { getUserByEmail, signUpUser };