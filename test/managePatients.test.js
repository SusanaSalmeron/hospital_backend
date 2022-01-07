const patientsModel = require('../models/patients.model');
const { dataForPatientTest } = require('../mocks/mocksForPatients')
const loki = require('lokijs');
const faker = require('faker');

describe('manage patients', () => {
    let mockData


    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        mockData = dataForPatientTest()
        const diseases = [
            {
                name: "cold"
            },
            {
                name: "covid-19"
            },
            {
                name: "Chickenpox"
            }
        ]
        const diseasesTable = db.addCollection("diseases")
        diseasesTable.insert(diseases)
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

    /* test('should add patient to db', async () => {
        const patient = await patientsModel.addPatientToDB(11, "Mary", "mary@gmail.com", "28029", "Madrid", "Spain", "+34998654326", "09/02/1990", "jfsguip", " Adeslas")
        console.log(patient)
        expect(patient).toBeDefined()
    }) */

    test('get diseases from db', async () => {
        const diseases = await patientsModel.getDiseases()
        expect(diseases).toBeDefined()
    })

    test('Should add new record to patient clinical record', async () => {
        const newRecord = await patientsModel.addNewRecord(mockData.fakePatientIds[3], mockData.diagnostic, mockData.description)
        expect(newRecord).toBeDefined()
    })

    test('Should not add a new record from a non valid patient', async () => {
        const newRecord = await patientsModel.addNewRecord(8, mockData.dianostic, mockData.description)
        expect(newRecord.id).not.toBeTruthy()
    })

    test('should modify patient data', async () => {
        const data = await patientsModel.modifyPatientData(mockData.fakePatientIds[0], mockData.fakePatientName[0], "g@gmail.com", "dfhsdgh", "28029", "Madrid", "Spain", "+34000000000", "DFfgg345", "Adeslas")
        expect(data.phone).toBe("+34000000000")
    })

    test('should not modify patient data from a non valid id', async () => {
        const data = await patientsModel.modifyPatientData(mockData.fakePatientIds[15], "Aurora", "g@gmail.com", "dfhsdgh", "28029", "Madrid", "Spain", "+34000000000", "DFfgg345", "Adeslas")
        expect(data.result).not.toBeTruthy()

    })



})