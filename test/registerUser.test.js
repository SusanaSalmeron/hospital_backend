const userModel = require('../models/users.model');
const { dataForUsersTests } = require('../mocks/mocksForUsers')
const faker = require('faker');
const loki = require('lokijs');
const log = require('npmlog');

describe('manage register', () => {
    let mockData
    beforeAll(async () => {
        global.db = new loki('hospital.test.db');
        mockData = await dataForUsersTests()
    })
    afterAll(() => {
        global.db.close()
    })

    test('should insert a new user', async () => {
        const outcome = await userModel.signUp(mockData[1].email, mockData[1].password, mockData[1].name)
        expect(outcome).toBeTruthy()
    })
    test('should not insert a new user with a mail in database', async () => {
        const outcome = await userModel.signUp(mockData[0].email, mockData[0].password, mockData[0].name)
        expect(outcome).toBeFalsy()
    })
})
