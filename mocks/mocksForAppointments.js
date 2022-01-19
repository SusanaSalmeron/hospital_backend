const loki = require('lokijs')
const faker = require('faker')

const dataForAppointmentsTests = () => {
    const table = db.addCollection("appointments");
    const doctorsTable = db.addCollection('doctors');
    const patientsTable = db.addCollection("patients");
    let fakePatientsIds = []
    let fakeDoctorsIds = []
    let fakeMockDates = []
    let fakeAppsIds = []
    for (let i = 0; i < 5; i++) {
        const newFakeAppId = faker.datatype.number()
        const newFakePatientId = faker.datatype.number()
        const newFakeDoctorId = faker.datatype.number()
        const newFakeMockDate = faker.date.future()

        table.insert({
            id: newFakeAppId,
            doctorId: newFakeDoctorId,
            patientId: newFakePatientId,
            pickedDate: newFakeMockDate
        })

        doctorsTable.insert({
            id: newFakeDoctorId,
            name: faker.name.findName(),
            email: faker.internet.email(),
            speciality: faker.lorem.word()
        })

        patientsTable.insert(
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
        fakeAppsIds.push(newFakeAppId)
        fakePatientsIds.push(newFakePatientId)
        fakeDoctorsIds.push(newFakeDoctorId)
        fakeMockDates.push(newFakeMockDate)
    }
    return {
        fakeAppsIds,
        fakeDoctorsIds,
        fakeMockDates,
        fakePatientsIds
    }
}

module.exports = { dataForAppointmentsTests }