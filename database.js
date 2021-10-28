const fs = require('fs');
const path = require('path');

const loki = require('lokijs')
global.db = new loki('hospital.db');

function loadData() {
    const tables = ['users', 'patients', 'doctors', 'clinicalRecord', 'appointments']
    tables.forEach(tableName => {
        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data', `${tableName}.json`));
        let data = JSON.parse(rawdata);
        const table = db.addCollection(tableName);
        table.insert(data)
    })
    /* let t = db.getCollection('patients')
    console.log(t.where(obj => obj.id === 10003)) */
}

module.exports = { loadData }