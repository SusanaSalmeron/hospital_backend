const fs = require('fs');
const path = require('path');
let rawdata = fs.readFileSync(path.resolve(__dirname, 'patients.json',));
let rdata = fs.readFileSync(path.resolve(__dirname, 'clinicalRecord.json'))
let patients = JSON.parse(rawdata);
let records = JSON.parse(rdata);

const diagnosticsMap = {}

const getAll = async () => {
    return patients
}

const getBy = async (params) => {
    const { keyword } = params
    return patients.filter(patient => {
        return patient.diagnostics.toLowerCase() === keyword
            || patient.address.toString() === keyword
            || patient.name.toLowerCase() === keyword
            || patient.email.toLowerCase() === keyword
            || patient.diagnostics.toLowerCase() === keyword
            || patient.postalZip.toLowerCase() === keyword
            || patient.region.toLowerCase() === keyword
            || patient.country.toLowerCase() === keyword
            || patient.phone.toLowerCase() === keyword
    })
}

const getById = async (id) => {
    const patient = patients.filter(patient => {
        return patient.id === parseInt(id)
    })
    return patient.length === 1 ? patient[0] : null
}

const getRecordById = async (id) => {
    const record = records.filter(record => {
        return record.id === parseInt(id)
    })
    if (record.length === 1) {
        const { name, address } = await getById(id)
        return {
            ...record[0],
            otherDiagnostics: diagnosticsMap[id] || [],
            ...{
                name: name,
                address: address
            }
        }
    }
    return null
}

const addNewRecord = async (id, diagnostic, description) => {
    const patient = await getById(id)
    console.log(patient)
    if (patient) { //1) Existe el paciente??
        const patientDiagnostics = diagnosticsMap[id] || [] //Entiendes esto ???  
        const currentDiagnostic = {
            diagnostic: diagnostic,
            description: description
        }
        patientDiagnostics.push(currentDiagnostic)
        diagnosticsMap[id] = patientDiagnostics
        return true //Esto re.presenta que fue bien
    }
    return false //Esto representa que fue mal
}

/*
NOTA: Estar usando y gestionando la informacion en fichero, de forma simple es para trabajar
con javascript con mapas, y practicar mergear informacion, entre otras cosas. Esto es una excusa 
para entender eso mejor. 
*/

module.exports = { getAll, getBy, getById, getRecordById, addNewRecord };