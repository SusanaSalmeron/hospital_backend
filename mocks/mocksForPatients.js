const loki = require('lokijs');
const faker = require('faker');


const dataForPatientTest = () => {
    const table = db.addCollection("patients");
    let fakePatientIds = []
    let fakePatientName = []
    for (let i = 0; i < 5; i++) {
        const newFakeId = faker.datatype.number()
        const newFakePatientName = faker.name.findName()
        table.insert(
            {
                password: faker.internet.password(),
                name: newFakePatientName,
                address: faker.address.streetAddress(),
                email: faker.internet.email(),
                postalZip: faker.address.zipCode(),
                region: faker.address.state(),
                country: faker.address.country(),
                phone: faker.phone.phoneNumber(),
                id: newFakeId,
                dob: faker.date.past(),
                ssnumber: faker.datatype.number(8),
                company: faker.company.companyName()
            }
        );
        fakePatientIds.push(newFakeId)
        fakePatientName.push(newFakePatientName)
    }
    const recordsTable = db.addCollection('clinicalRecords')
    recordsTable.insert({
        date: faker.date.recent(),
        id: fakePatientIds[3],
        description: faker.lorem.paragraph(),
        diagnostic: faker.lorem.word()
    })
    return {
        fakePatientIds,
        fakePatientName
    }
}

module.exports = { dataForPatientTest }