let userId = 10040

const getUserByEmail = (email) => {
    const users = db.getCollection('users')
    const foundUser = users.findOne({ email: email })
    return foundUser
}

const signUp = (userEmail, userPassword, userName) => {
    const usersTable = db.getCollection('users')
    const foundUser = usersTable.findOne({ email: userEmail })
    if (!foundUser) {
        //COMO reutilizamos un valor? pues sacandolo fuera!!!!
        const newUserId = userId++
        usersTable.insert({
            name: userName,
            password: userPassword,
            email: userEmail,
            role: "patient",
            id: newUserId // <----- AQUI, pero es un autoincremental!!, asi no nos vale para poder leerlo, NECESITAMOS REUSARLO!! 
            //que hacemos cuando tenemos que reusar un valor??, pues refactorizar
        })
        // Found user no existe!! si estas en esta linea de codigo, porqyue si existe nunca hubieras entrado, has puesto esto asi sin leer que es lo que te digo siempre
        //Donde esta el user Id??
        return newUserId

    }
    return null
}

module.exports = { getUserByEmail, signUp };