const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'patients.json'));
let patients = JSON.parse(rawdata);


const getAll = async () => {
    return patients
}

const getBy = async (params) => {
    const { keyword } = params
    return patients.filter(patient => {
        return patient.diagnostico.toLowerCase() === keyword
            || patient.edad.toString() === keyword
            || patient.nombre.toLowerCase() === keyword
            || patient.numeroSS.toLowerCase() === keyword
            || patient.diagnostico.toLowerCase() === keyword
    })
}

module.exports = { getAll, getBy }