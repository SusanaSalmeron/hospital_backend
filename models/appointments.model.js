const fs = require('fs');
const path = require('path');
const { getById } = require('./patients.model');
let rawdata = fs.readFileSync(path.resolve(__dirname, 'doctors.json'));
let doctors = JSON.parse(rawdata);
let rawD = fs.readFileSync(path.resolve(__dirname, 'appointments.json'));
let appointments = JSON.parse(rawD);

const appointmentsMap = {}
let appointmentId = 1000

const appointmentByPatientId = (appointment, id) => {
    return appointment.patientId === parseInt(id)
}

const changeAppointmentWithDoctorName = app => {
    const foundDoctors = doctors.filter(doctor => {
        return doctor.id === app.doctorId
    })
    const doctorName = foundDoctors.length > 0 ? foundDoctors[0].name : "unknown"
    return {
        id: app.id,
        pickedDate: app.pickedDate,
        doctor: doctorName
    }
}

const getAppointById = async (id) => {
    const myAppointments = appointments
        .filter(app => appointmentByPatientId(app, id))
        .map(changeAppointmentWithDoctorName)
    const otherAppointments = appointmentsMap[id] || []
    return myAppointments.concat(otherAppointments)
}

const addNewAppointment = async (id, date, doctor) => {
    const patient = await getById(id)
    if (patient) {
        const patientAppointment = appointmentsMap[id] || []
        const currentAppointment = {
            id: appointmentId++,
            pickedDate: date,
            doctor: doctor
        }
        patientAppointment.push(currentAppointment)
        appointmentsMap[id] = patientAppointment
        return true
    }
    return false
}

const changeAppointment = async (id, date, appId, doctor) => {
    const patient = await getById(id)
    if (patient) {
    }
}

const deleteAppointment = async (id, appId) => {
    const patient = await getById(id)
    const appointments = await getAppointById(id)

    if (patient && appointments) {
        return true
    }
}


module.exports = { getAppointById, addNewAppointment, changeAppointment, deleteAppointment }