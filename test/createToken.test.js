
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')

const tokenService = require('../services/tokenService');
const mockUser = {
    "name": "testing_name",
    "email": "testing_email@gmail.com",
    "password": "testingPassword",
    "role": "pepito",
    "id": 10
}

describe('create a valid Token', () => {
    beforeAll(() => {
        process.env.SECRET_TOKEN = "hola bebe"
    })
    test('token must contain a role and an expiration', () => {
        const token = tokenService.createToken(mockUser);
        const decodeToken = jwt.decode(token)
        expect(decodeToken.role).toBe('pepito')
        expect(decodeToken.expiration).toBeDefined()
        expect(decodeToken.expiration - dayjs().unix()).toBeLessThanOrEqual(300)
    })
})