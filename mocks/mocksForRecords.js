const faker = require('faker');

const dataForRecordsTests = () => {
    const tableRecords = db.addCollection('clinicalRecords');
    const tablePatients = db.addCollection("patients");
    let fakePatientIds = [];
    let fakeDescriptions = [];
    let fakeDiagnostics = [];
    for (let i = 0; i < 5; i++) {
        const newFakePatientId = faker.datatype.number()
        const newFakeDescription = faker.lorem.paragraph()
        const newFakeDiagnostic = faker.lorem.word()
        tableRecords.insert(
            {
                date: faker.date.recent(),
                id: newFakePatientId,
                description: newFakeDescription,
                diagnostic: newFakeDiagnostic
            }
        )
        tablePatients.insert(
            {
                password: faker.internet.password(),
                name: faker.name.findName(),
                address: faker.address.streetAddress(),
                email: faker.internet.email(),
                postalZip: faker.address.zipCode(),
                region: faker.address.state(),
                country: faker.address.country(),
                phone: faker.phone.phoneNumber(),
                id: newFakePatientId,
                dob: faker.date.past(),
                ssnumber: faker.datatype.number(8),
                company: faker.company.companyName()
            }
        )
        fakePatientIds.push(newFakePatientId)
        fakeDescriptions.push(newFakeDescription)
        fakeDiagnostics.push(newFakeDiagnostic)
    }
    return {
        fakePatientIds,
        fakeDiagnostics,
        fakeDescriptions
    }

}

module.exports = { dataForRecordsTests }


