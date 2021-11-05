const patientsModel = require('../models/patients.model');
const { dataForPatientTest } = require('../mocks/mocksForPatients')
const loki = require('lokijs');
const faker = require('faker');

describe('manage patients', () => {
    let mockData

    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        mockData = dataForPatientTest()
    })
    afterAll(() => {
        global.db.close()
    })
    test('should get the patients list', async () => {
        const patients = await patientsModel.getAll()
        expect(patients).toHaveLength(5)
    })

    test('should return a patient by id', async () => {
        const patient = await patientsModel.getById(mockData.fakePatientIds[0])
        expect(patient).toBeDefined()
    })

    test('should return all patients by id', () => {
        mockData.fakePatientIds.forEach(async id => {
            const patient = await patientsModel.getById(id)
            expect(patient).not.toBeNull()
        })
    })

    test('should return null from a non valid patient id', async () => {
        const patient = await patientsModel.getById(faker.datatype.number())
        expect(patient).toBeNull()
    })

    test('should return records from a valid patient', async () => {
        const records = await patientsModel.getRecordById(mockData.fakePatientIds[3])
        expect(records).toBeTruthy()
        expect(records.name).toBeDefined()
    })

    test('should not return records from a valid patient without records', async () => {
        const records = await patientsModel.getRecordById(mockData.fakePatientIds[2])
        expect(records.records).toHaveLength(0)
    })

    test('should return null from a non valid patient', async () => {
        const records = await patientsModel.getRecordById(1000)
        expect(records.result).toBeNull()
        expect(records.name).not.toBeDefined()
    })

    test('should search a patient by keyword', async () => {
        const patients = await patientsModel.getBy({ keyword: mockData.fakePatientName[1] })
        expect(patients).toHaveLength(1)
        expect(patients[0].country).toBeDefined()
    })



})