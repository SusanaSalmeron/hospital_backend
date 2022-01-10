const appointmentsModel = require('../models/appointments.model')
const { dataForAppointmentsTests } = require('../mocks/mocksForAppointments')
const { dataForDoctorsTest } = require('../mocks/mocksForDoctors')
const loki = require('lokijs')
const faker = require('faker')

let mockData
let mockDoctors

describe('manage appointments', () => {
    beforeAll(() => {
        global.db = new loki('hospital.test.db');
        mockData = dataForAppointmentsTests()
        mockDoctors = dataForDoctorsTest()
    })
    afterAll(() => {
        global.db.close()
    })
    test('should get appointments by patient id', async () => {
        const appointments = await appointmentsModel.getAppointmentsByPatientId(mockData.fakePatientsIds[0])
        expect(appointments).not.toBeNull()
        expect(appointments).toHaveLength(1)
        expect(appointments[0].doctor).toBeDefined()
    })

    test('should not get any appointment from a non valid patient', async () => {
        const appointments = await appointmentsModel.getAppointmentsByPatientId(15)
        expect(appointments).toHaveLength(0)
    })

    test('should add a new appointment', async () => {
        let newAppointment = await appointmentsModel.addNewAppointment(mockData.fakePatientsIds[0], mockData.fakeMockDates[0], mockData.fakeDoctorsIds[0])
        expect(newAppointment.result).toBeTruthy()
    })

    test('should not add an appoinment from a non valid patient', async () => {
        let newAppointment = await appointmentsModel.addNewAppointment(15, mockData.fakeMockDates[2], mockData.fakeDoctorsIds[4])
        expect(newAppointment.result).toBeFalsy()
    })

    test('should not add an appointment with a non valid doctor', async () => {
        let newAppointment = await appointmentsModel.addNewAppointment(mockData.fakePatientsIds[1], mockData.fakeMockDates[3], 8)
        expect(newAppointment.doctorId).toBeFalsy()
    })

    test('should modify an appointment', async () => {
        let appointmentTable = db.getCollection('appointments')
        let currentDate = appointmentTable.findOne({ id: mockData.fakeAppsIds[0] }).pickedDate
        expect(currentDate).toEqual(mockData.fakeMockDates[0])
        let newDate = faker.date.past()
        let result = await appointmentsModel.changeAppointment(mockData.fakePatientsIds[0], newDate, mockData.fakeAppsIds[0], mockData.fakeDoctorsIds[2])
        expect(result.result).toBeTruthy()
        let newApp = appointmentTable.findOne({ id: mockData.fakeAppsIds[0] })
        expect(newApp.pickedDate).not.toBe(currentDate)
    })

    test('should not modify a non existent appointment from a valid patient', async () => {
        let result = await appointmentsModel.changeAppointment(mockData.fakePatientsIds[3], 8)
        expect(result.result).toBeFalsy()
    })

    test('should not modify an existent appointment from a not valid patient', async () => {
        let result = await appointmentsModel.changeAppointment(15, mockData.fakeAppsIds[1])
        expect(result.result).toBeFalsy()
    })

    test('should not modify a non existent appointment from a not valid patient', async () => {
        let result = await appointmentsModel.changeAppointment(15, 8)
        expect(result.result).toBeFalsy()
    })

    test('should delete an appointment', async () => {
        let appointmentTable = db.getCollection('appointments')
        let result = await appointmentsModel.deleteAppointment(mockData.fakePatientsIds[3], mockData.fakeAppsIds[3])
        expect(result.result).toBeTruthy()
        expect(appointmentTable.findOne({ id: mockData.fakeAppsIds[3] })).toBeNull()
    })


    test('should not delete a non existent appointment from a valid patient', async () => {
        let result = await appointmentsModel.deleteAppointment(mockData.fakePatientsIds[1], 15)
        expect(result.result).toBeFalsy()
    })

    test('should not delete an existent appointment from a non existent patient', async () => {
        let result = await appointmentsModel.deleteAppointment(8, mockData.fakeAppsIds[4])
        expect(result.result).toBeFalsy()
    })

    test('should not delete a non existent appointment from a non existent patient', async () => {
        let result = await appointmentsModel.deleteAppointment(8, 8)
        expect(result.result).toBeFalsy()
    })

    test('should show all appointments from doctor', async () => {
        let appointments = await appointmentsModel.getAllAppointmentsFromDoctor(mockData.fakeDoctorsIds[0])
        expect(appointments[0].doctorId).toBeDefined()
        expect(appointments[0].doctorId).toEqual(mockData.fakeDoctorsIds[0])
    })

    test('should not show any appointments from a non existent doctor', async () => {
        let appointments = await appointmentsModel.getAllAppointmentsFromDoctor(10)
        expect(appointments[0]).toBeFalsy()
    })

    test('get diseases from db', async () => {
        const doctors = await appointmentsModel.getDoctors()
        expect(doctors).toBeDefined()
    })

})
