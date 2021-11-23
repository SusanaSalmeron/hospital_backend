
const checkValidEmail = (userMail) => {
    const usersTable = db.getCollection('users')
    const foundUser = usersTable.findOne({ email: userMail })
    return !foundUser
}

module.exports = { checkValidEmail }