const loki = require('lokijs');
const faker = require('faker');


const dataForDoctorsTest = () => {
    const table = db.addCollection("doctors")
    let fakeDoctorsIds = []
    let fakeDoctorsName = []
    for (let i = 0; i < 5; i++) {
        const newFakeId = faker.datatype.number()
        const newFakeDoctorName = faker.name.findName()
        table.insert(
            {
                id: newFakeId,
                name: newFakeDoctorName,
                email: faker.internet.email(),
                speciality: faker.lorem.word()
            }
        )
        fakeDoctorsIds.push(newFakeId)
        fakeDoctorsName.push(newFakeDoctorName)
    }
    return {
        fakeDoctorsIds,
        fakeDoctorsName
    }

}

module.exports = {
    dataForDoctorsTest
}