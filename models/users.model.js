let userId = 10040

const getUserByEmail = (email) => {
    const users = db.getCollection('users')
    const foundUser = users.findOne({ email: email })
    if (foundUser) {
        return {
            name: foundUser.name,
            password: foundUser.password,
            email: foundUser.email,
            role: foundUser.role,
            id: foundUser.id,
        }
    } else {
        return null
    }

}

const signUp = (userEmail, userPassword, userName) => {
    const usersTable = db.getCollection('users')
    const foundUser = usersTable.findOne({ email: userEmail })
    if (!foundUser) {
        const newUserId = userId++
        usersTable.insert({
            name: userName,
            password: userPassword,
            email: userEmail,
            role: "patient",
            id: newUserId
        })
        return newUserId
    }
    return null
}



module.exports = { getUserByEmail, signUp };