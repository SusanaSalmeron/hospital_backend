const { getById } = require('./patients.model');
const dayjs = require('dayjs')

let appointmentId = 1000

const getAppointmentsByPatientId = async (id) => {
    let appoints = []
    const appointmentsTable = db.getCollection('appointments')
    const doctorsTable = db.getCollection('doctors')
    try {
        appoints = appointmentsTable.find({ patientId: { '$eq': parseInt(id) } })
        return appoints.map(app => {
            const doc = doctorsTable.findOne({ id: app.doctorId })
            return {
                id: app.id,
                pickedDate: app.pickedDate,
                doctor: doc.name,
                doctorId: doc.id
            }
        })
    } catch (err) {
        console.log(err)
    }
    return null
}

const addNewAppointment = async (patientId, date, doctorId) => {
    const patient = await getById(patientId)
    const doctorsTable = db.getCollection('doctors')
    const doctor = doctorsTable.findOne({ id: doctorId })
    const newDate = dayjs().format('DD-MM-YYYY')
    if (patient && doctor && date >= newDate) {
        const appointmentsTable = db.getCollection('appointments')
        appointmentsTable.insert({
            id: appointmentId++,
            patientId: parseInt(patientId),
            pickedDate: date,
            doctorId: parseInt(doctorId)
        })
        return { result: true }
    }
    const message = !patient ? `The patientId ${patientId} does not exist` :
        `The doctorId ${doctorId} does not exists`
    return {
        result: false,
        message: message
    }
}

const changeAppointment = async (patientId, date, appId, doctorId) => {
    const appointmentTable = db.getCollection('appointments')
    let appoint = appointmentTable.findOne({ id: parseInt(appId) })
    if (!appoint) {
        return {
            result: false,
            message: "This appointment " + appId + " doesn't exist for patient " + patientId
        }
    }
    if (appoint.patientId === parseInt(patientId)) {
        appoint.pickedDate = date
        appoint.doctorId = parseInt(doctorId)
        appointmentTable.update(appoint)
        return { result: true }
    }
    return { result: false }
}

const deleteAppointment = async (id, appId) => {
    const appointmentTable = db.getCollection('appointments')
    let appoint = appointmentTable.findOne({ id: parseInt(appId) })
    if (!appoint) {
        return {
            result: false,
            message: "This appointment " + appId + " doesn't exist for patient " + id
        }
    }
    if (appoint.patientId === parseInt(id)) {
        appointmentTable.remove(appoint)
        return { result: true }
    }
    return { result: false }
}

const getDoctors = async () => {
    const doctorsTable = db.getCollection("doctors")
    let doctors = doctorsTable.find(true)
    return doctors.map(doctor => {
        return {
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            speciality: doctor.speciality
        }
    })
}

const getAllAppointmentsFromDoctor = async (doctorId) => {
    const appointmentsTable = db.getCollection("appointments")
    const appointments = appointmentsTable.find({ doctorId: parseInt(doctorId) })
    const patientTable = db.getCollection("patients")
    return appointments.map(appoint => {
        return {
            id: appoint.id,
            doctorId: appoint.doctorId,
            patientId: appoint.patientId,
            patientName: patientTable.findOne({ id: appoint.patientId }).name,
            pickedDate: appoint.pickedDate
        }
    })

}


module.exports = { getAppointmentsByPatientId, addNewAppointment, changeAppointment, deleteAppointment, getDoctors, getAllAppointmentsFromDoctor }