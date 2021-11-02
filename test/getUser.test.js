const userModel = require('../models/users.model');

const loki = require('lokijs')
const mockEmail = "testing_email@gmail.com"

describe('manage users', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("users");
        table.insert({
            email: mockEmail,
            name: "pepito"
        })
    });
    afterAll(() => {
        global.db.close()
    })
    test('should get a valid user with given email', () => {
        const user = userModel.getUserByEmail(mockEmail)
        expect(user.name).toBe('pepito')
        expect(user.email).toBe(mockEmail)
    })
})