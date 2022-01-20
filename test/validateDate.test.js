const validateDate = require('../middleware/validateDate')
const faker = require('faker')




describe('validate a date', () => {
    const mockPickedDate = faker.date.future()
    const mockActualDate = faker.date.recent()
    test('validating a date can be greater than or equal the actual date', () => {
        expect(mockPickedDate).toBeGreaterThanOrEqual(mockActualDate)
    })
})