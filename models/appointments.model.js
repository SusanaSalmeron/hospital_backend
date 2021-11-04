const { getById } = require('./patients.model');

let appointmentId = 1000

const getAppointById = async (id) => {
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
    if (patient) {
        const appointmentTable = db.getCollection('appointments')
        appointmentTable.insert({
            id: appointmentId++,
            patientId: parseInt(patientId),
            pickedDate: date,
            doctorId: parseInt(doctorId)
        })
        return true
    }
    return false
}

const changeAppointment = async (patientId, date, appId, doctorId) => {
    const patient = await getById(patientId)
    if (patient) {
        const appointmentTable = db.getCollection('appointments')
        let appoint = appointmentTable.findOne({ id: parseInt(appId) })
        appoint.pickedDate = date
        appoint.doctorId = parseInt(doctorId)
        appointmentTable.update(appoint)
        return true
    }
    return false
}

const deleteAppointment = async (id, appId) => {
    const patient = await getById(id)
    const appointments = await getAppointById(id)
    if (patient && appointments) {
        const appointmentTable = db.getCollection('appointments')
        let appoint = appointmentTable.findOne({ id: parseInt(appId) })
        appointmentTable.remove(appoint)
        return true
    }
    return false
}


module.exports = { getAppointById, addNewAppointment, changeAppointment, deleteAppointment }