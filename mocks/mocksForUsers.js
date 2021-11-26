const faker = require('faker');

const dataForUsersTests = async () => {
    const usersTable = db.addCollection('users');
    const mockUsers = [
        {
            name: "Ruben",
            password: faker.internet.password(),
            email: 'email@email.com',
            role: "patient",
            id: faker.datatype.number()
        },
        {
            name: "Ana",
            password: faker.internet.password(),
            email: 'ana@email.com',
            role: "patient",
            id: faker.datatype.number()
        }
    ]
    usersTable.insert(mockUsers[0])

    return mockUsers
}

module.exports = { dataForUsersTests }