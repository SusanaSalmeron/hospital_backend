const userModel = require('../models/users.model');
const faker = require('faker');
const loki = require('lokijs');


let mockName = faker.name.findName()
let mockPassword = faker.internet.password()
let mockEmail = faker.internet.email()

describe('manage signUp', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("users");
        table.insert({
            name: mockName,
            password: mockPassword,
            email: mockEmail,
            role: "patient",
            id: faker.datatype.number()
        })
    });
    afterAll(() => {
        global.db.close()
    })
    test('should sign up an existent user', () => {
        const user = userModel.signUp(mockEmail, mockPassword, mockName)
        expect(user).toBeFalsy()
    })


})