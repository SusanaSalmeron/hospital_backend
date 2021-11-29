const dayjs = require('dayjs');


const getAll = async () => {
    const patientsTable = db.getCollection('patients')
    const clinicalRecordsTable = db.getCollection('clinicalRecords')
    const patients = patientsTable.find(true)
    try {
        const patientsDiagnostics = patients.map(patient => {
            const records = clinicalRecordsTable.find({ id: patient.id })
            const lastDiagnostics = records.length >= 1 ? records[0].diagnostics : "none"
            patient.diagnostics = lastDiagnostics
            return patient
        })
        return patientsDiagnostics
    } catch (err) {
        console.log(err)
    }
}

const getBy = async (params) => {
    let { keyword } = params
    console.log(keyword)
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
        otherPatients = records.map(record => patientsTable.findOne({ id: record.id }))
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
            company: patient.company,
            dob: patient.dob,
            records: records
        }
    }
    return { result: null }
}

const addPatientToDB = async (id, name, email, address, postalZip, region, country, phone, dob, ssnumber, company) => {
    const patientTable = db.getCollection("patients")
    patientTable.insert(
        {
            name: name,
            address: address,
            email: email,
            postalZip: postalZip,
            region: region,
            country: country,
            phone: phone,
            id: id,
            dob: dob,
            ssnumber: ssnumber,
            company: company
        }
    )
}

const addNewRecord = async (id, diagnostic, description) => {
    const patient = await getById(id)
    if (patient) {
        const recordsTable = db.getCollection('clinicalRecords')
        recordsTable.insert({
            id: parseInt(id),
            diagnostics: diagnostic,
            description: description,
            date: dayjs().format('DD-MM-YYYY')
        })
        return { result: true }
    }
    return { result: false }
}

const getDiseases = async () => {
    const diseasesTable = db.getCollection('diseases')
    return diseasesTable.find(true).map(doc => doc.name)
}


module.exports = { getAll, getBy, getById, getRecordById, addNewRecord, getDiseases, addPatientToDB };