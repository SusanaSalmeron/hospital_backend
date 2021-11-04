const appointmentsModel = require('../models/appointments.model')
const loki = require('lokijs')
const faker = require('faker')
const { expect, test } = require('@jest/globals')

let patientId = faker.datatype.number()
let doctorId = faker.datatype.number()
let mockDate = faker.date.recent()
let appIds = []


describe('manage appointments', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        const table = db.addCollection("appointments");
        for (let i = 0; i < 5; i++) {
            let appId = faker.datatype.number()
            appIds.push(appId)
            table.insert({
                id: appId,
                doctorId: doctorId,
                patientId: patientId,
                pickedDate: mockDate
            })
        }
        const doctorsTable = db.addCollection('doctors')
        doctorsTable.insert({
            id: doctorId,
            name: faker.name.findName(),
            email: faker.internet.email(),
            speciality: faker.lorem.word()
        })
        const patientsTable = db.addCollection("patients");
        patientsTable.insert(
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
        );
    })
    afterAll(() => {
        global.db.close()
    })
    test('should get appointments by patient id', async () => {
        const appointments = await appointmentsModel.getAppointById(patientId)
        expect(appointments).not.toBeNull()
        expect(appointments).toHaveLength(5)
        expect(appointments[4].doctor).toBeDefined()

    })

    test('should add a new appointment', async () => {
        let newAppointment = await appointmentsModel.addNewAppointment(patientId, mockDate, doctorId)
        expect(newAppointment).toBeTruthy()

    })

    test('should modify an appointment', async () => {
        let appointmentTable = db.getCollection('appointments')
        let currentDate = appointmentTable.findOne({ id: appIds[0] }).pickedDate
        expect(currentDate).toEqual(mockDate)
        let newDate = faker.date.past()
        let result = await appointmentsModel.changeAppointment(patientId, newDate, appIds[0], doctorId)
        expect(result).toBeTruthy()
        let newApp = appointmentTable.findOne({ id: appIds[0] })
        expect(newApp.pickedDate).not.toBe(currentDate)
    })

    test('should delete an appointment', async () => {
        let appointmentTable = db.getCollection('appointments')
        let appId = appIds[0]
        let result = await appointmentsModel.deleteAppointment(patientId, appId)
        expect(result).toBeTruthy()
        expect(appointmentTable.findOne({ id: appId })).toBeFalsy()
    })
})