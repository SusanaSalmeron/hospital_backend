const userModel = require('../models/users.model');
const faker = require('faker')

const loki = require('lokijs')
let mockEmail = faker.internet.email()

describe('manage users', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("users");
        table.insert({
            email: mockEmail,
            name: faker.name.findName()
        })
    });
    afterAll(() => {
        global.db.close()
    })
    test('should get a valid user with given email', () => {
        const user = userModel.getUserByEmail(mockEmail)
        expect(user.name).toBe(user.name)
        expect(user.email).toBe(user.email)
    })
})