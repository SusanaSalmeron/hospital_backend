const patientModel = require('../models/patients.model');
const { dataForRecordsTests } = require('../mocks/mocksForRecords')
const loki = require('lokijs');

describe('manage patients records', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        mockData = dataForRecordsTests()

    })
    afterAll(() => {
        global.db.close()
    })
    test('should show a patient record by id', async () => {
        const record = await patientModel.getRecordById(mockData.fakePatientIds[2])
        expect(record).toBeTruthy()
        expect(record.records).toBeDefined()
        expect(record.records).toHaveLength(1)
    })
    test("should add a new record", async () => {
        const newRecord = await patientModel.addNewRecord(mockData.fakePatientIds, mockData.fakeDiagnostics, mockData.fakeDescription)
        expect(newRecord).toBeTruthy()
    })
})