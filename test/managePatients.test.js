const patientModel = require('../models/patients.model');

const loki = require('lokijs');

describe('show all patients', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("patients");
        table.insert([
            {
                "password": "PasswordMock",
                "name": "MockName",
                "address": "MockingAddress",
                "email": "mockemail@gmail.com",
                "postalZip": "5641",
                "region": "Mock",
                "country": "mmmm",
                "phone": "(000) 000-00000",
                "id": 56544,
                "dob": "30-11-1917",
                "ssnumber": "87676555l",
                "company": "MockCompany Inc"
            },
            {
                "password": "PasswordMock2",
                "name": "MockName2",
                "address": "MockingAddress2",
                "email": "mockemail2@gmail.com",
                "postalZip": "18331",
                "region": "blals",
                "country": "Australia",
                "phone": "1-252-310-3021",
                "id": 13566,
                "dob": "11-01-1941",
                "ssnumber": "1173222DE",
                "company": "MockCompany Inc"
            }
        ]);
    })
    afterAll(() => {
        global.db.close()
    })
    test('should get the patients list', async () => {
        const patients = await patientModel.getAll()
        expect(patients).toHaveLength(2)
    })
})