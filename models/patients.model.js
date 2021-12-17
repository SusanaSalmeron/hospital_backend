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
            return {
                name: patient.name,
                address: patient.address,
                email: patient.email,
                postalZip: patient.postalZip,
                region: patient.region,
                country: patient.country,
                phone: patient.phone,
                id: patient.id,
                dob: patient.dob,
                ssnumber: patient.ssnumber,
                company: patient.company,
                diagnostics: patient.diagnostics
            }
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

    let filteredPatient = foundPatients.concat(otherPatients)
    return filteredPatient.map(fp => {
        return {
            name: fp.name,
            address: fp.address,
            email: fp.email,
            postalZip: fp.postalZip,
            region: fp.region,
            country: fp.country,
            phone: fp.phone,
            id: fp.id,
            dob: fp.dob,
            ssnumber: fp.ssnumber,
            company: fp.company,
            diagnostics: fp.diagnostics
        }
    })
}

const getById = async (someId) => {
    const patientsTable = db.getCollection('patients')
    const patient = patientsTable.findOne({ id: parseInt(someId) })
    return {
        name: patient.name,
        address: patient.address,
        email: patient.email,
        postalZip: patient.postalZip,
        region: patient.region,
        country: patient.country,
        phone: patient.phone,
        id: patient.id,
        dob: patient.dob,
        ssnumber: patient.ssnumber,
        company: patient.company,
        diagnostics: patient.diagnostics
    }
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
            records: records.map(r => {
                return {
                    date: r.date,
                    id: r.id,
                    description: r.description,
                    diagnostics: r.diagnostics
                }
            })
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

const modifyPatientData = async (patientId, patientName, email, address, postalZip, region, country, phone, ssnumber, company) => {
    const patientTable = db.getCollection('patients')
    let patient = patientTable.findOne({ id: parseInt(patientId) })
    if (!patient) {
        return {
            result: false,
            message: "This patient doesn't exist"
        }
    }
    patient.name = patientName
    patient.email = email
    patient.address = address
    patient.postalZip = postalZip
    patient.region = region
    patient.country = country
    patient.phone = phone
    patient.ssnumber = ssnumber
    patient.company = company
    return patientTable.update(patient)
}


module.exports = { getAll, getBy, getById, getRecordById, addNewRecord, getDiseases, addPatientToDB, modifyPatientData };