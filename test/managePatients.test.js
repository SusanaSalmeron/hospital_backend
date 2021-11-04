const patientsModel = require('../models/patients.model');
const loki = require('lokijs');
const faker = require('faker');

let fakeIds = []

describe('manage patients', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("patients");
        for (let i = 0; i < 5; i++) {
            const newFakeId = faker.datatype.number()
            table.insert(
                {
                    password: faker.internet.password(),
                    name: faker.name.findName(),
                    address: faker.address.streetAddress(),
                    email: faker.internet.email(),
                    postalZip: faker.address.zipCode(),
                    region: faker.address.state(),
                    country: faker.address.country(),
                    phone: faker.phone.phoneNumber(),
                    id: newFakeId,
                    dob: faker.date.past(),
                    ssnumber: faker.datatype.number(8),
                    company: faker.company.companyName()
                }
            );
            fakeIds.push(newFakeId)
        }
    })
    afterAll(() => {
        global.db.close()
    })
    test('should get the patients list', async () => {
        const patients = await patientsModel.getAll()
        expect(patients).toHaveLength(5)
    })

    test('should return a patient by id', async () => {
        const patient = await patientsModel.getById(fakeIds[3])
        expect(patient).toBeDefined()
    })
    test('should return all patients by id', async () => {
        for (let i = 0; i < 5; i++) {
            const patient = await patientsModel.getById(fakeIds)
            expect(patient).not.toBeNull()
        }
    })
    test('should return null', async () => {
        const patient = await patientsModel.getById(faker.datatype.number())
        expect(patient).toBeNull()
    })



})