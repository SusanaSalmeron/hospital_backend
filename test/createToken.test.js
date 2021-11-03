const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const faker = require('faker');


const tokenService = require('../services/tokenService');
const mockUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.lorem.word(),
    id: faker.datatype.number()
}

describe('create a valid Token', () => {
    beforeAll(() => {
        process.env.SECRET_TOKEN = "hola bebe"
    })
    test('token must contain a role and an expiration', () => {
        const token = tokenService.createToken(mockUser);
        const decodeToken = jwt.decode(token)
        expect(decodeToken.role).toBe(mockUser.role)
        expect(decodeToken.expiration).toBeDefined()
        expect(decodeToken.expiration - dayjs().unix()).toBeLessThanOrEqual(300)
    })
})