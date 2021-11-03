const patientModel = require('../models/patients.model');
const loki = require('lokijs');
const faker = require('faker');

let fakeIds = []
let patientId = faker.datatype.number();
let description = faker.lorem.paragraph();
let diagnostic = faker.lorem.word();


describe('manage patients records', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection('clinicalRecords');
        for (let i = 0; i < 5; i++) {
            table.insert(
                {
                    date: faker.date.recent(),
                    id: patientId,
                    description: description,
                    diagnostic: diagnostic
                }
            )
        }
        const tablePatients = db.addCollection("patients");
        tablePatients.insert(
            {
                password: faker.internet.password(),
                name: faker.name.findName(),
                address: faker.address.streetAddress(),
                email: faker.internet.email(),
                postalZip: faker.address.zipCode(),
                region: faker.address.state(),
                country: faker.address.country(),
                phone: faker.phone.phoneNumber(),
                id: patientId,
                dob: faker.date.past(),
                ssnumber: faker.datatype.number(8),
                company: faker.company.companyName()
            }
        )
    })
    afterAll(() => {
        global.db.close()
    })
    test('should show a patient record by id', async () => {
        const record = await patientModel.getRecordById(patientId)
        console.log(record)
        expect(record).toBeTruthy()
        expect(record.records).toBeDefined()
        expect(record.records).toHaveLength(5)
    })
})