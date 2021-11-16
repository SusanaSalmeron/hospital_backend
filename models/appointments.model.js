const { getById } = require('./patients.model');

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
                doctor: doc.name
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

    if (patient && doctor) {
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
    return doctorsTable.find(true)
}



module.exports = { getAppointmentsByPatientId, addNewAppointment, changeAppointment, deleteAppointment, getDoctors }