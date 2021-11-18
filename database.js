const fs = require('fs');
const path = require('path');

const loki = require('lokijs')
global.db = new loki('hospital.db');

function loadData() {
    const tables = ['users', 'patients', 'doctors', 'clinicalRecords', 'appointments', 'diseases']
    tables.forEach(tableName => {
        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data', `${tableName}.json`));
        let data = JSON.parse(rawdata);
        if (tableName == 'diseases') {
            data = data.map(d => {
                return {
                    name: d
                }
            })
        }
        const table = db.addCollection(tableName);
        table.insert(data)
    })
    /* let t = db.getCollection('patients')
    console.log(t.where(obj => obj.id === 10003)) */
}

module.exports = { loadData }