const fs = require('fs');
const path = require('path');
let rawdata = fs.readFileSync(path.resolve(__dirname, 'doctors.json'));
let doctors = JSON.parse(rawdata);
let rawD = fs.readFileSync(path.resolve(__dirname, 'appointments.json'));
let appointments = JSON.parse(rawD);

const appointmentsMap = {}

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
        date: app.date,
        doctor: doctorName
    }
}

const getAppointById = async (id) => {

    const myAppointments = appointments
        .filter(app => appointmentByPatientId(app, id))
        .map(changeAppointmentWithDoctorName)

    return myAppointments
}


module.exports = { getAppointById }