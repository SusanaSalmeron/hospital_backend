const dayjs = require('dayjs');


const getAll = async () => {
    const patientsTable = db.getCollection('patients')
    return patientsTable.find(true)
}

const getBy = async (params) => {
    let { keyword } = params
    keyword = keyword.toLowerCase()
    const patientsTable = db.getCollection('patients')
    let foundPatients = patientsTable.find({
        '$or': [
            { address: { '$regex': [keyword, 'i'] } },
            { name: { '$regex': [keyword, 'i'] } },
            { email: { '$regex': [keyword, 'i'] } },
            { postalZip: { '$contains': keyword } },
            { region: { '$regex': [keyword, 'i'] } },
            { country: { '$regex': [keyword, 'i'] } },
            { phone: { '$contains': keyword } }
        ]
    })
    const clinicalRecordsTable = db.getCollection('clinicalRecords')
    let otherPatients = []
    try {
        let records = clinicalRecordsTable.find({ diagnostics: { '$regex': [keyword, 'i'] } })
        otherPatients = records.map(record => patientTable.findOne({ id: record.id }))
    } catch (err) {
        console.log(err)
    }

    return foundPatients.concat(otherPatients)
}

const getById = async (someId) => {
    const patientsTable = db.getCollection('patients')
    const patient = patientsTable.findOne({ id: parseInt(someId) })
    return patient
}

const getRecordById = async (id) => {
    const patient = await getById(id)
    if (patient) {
        const clinicalRecordsTable = db.getCollection('clinicalRecords')
        const records = clinicalRecordsTable.find({ id: parseInt(id) })
        return {
            name: patient.name,
            address: patient.address,
            records: records
        }
    }
    return null
}

const addNewRecord = async (id, diagnostic, description) => {
    const patient = await getById(id)
    if (patient) {
        const recordsTable = db.getCollection('clinicalRecords')
        recordsTable.insert({
            id: parseInt(id),
            diagnostic: diagnostic,
            description: description,
            date: dayjs().format('DD-MM-YYYY')
        })
        return true
    }
    return false
}

const getOptions = async (diagnostics) => {
    diagnostics = patients.map(diagnostic => diagnostic.map(d => d.split('')))

}

module.exports = { getAll, getBy, getById, getRecordById, addNewRecord, getOptions };