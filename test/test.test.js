const express = require('express')
const request = require('supertest')
const app = express()
const patients = require('../routes/api/patients')


describe("GET/patients", () => {
    describe("when doctor is logged", () => {
        test("should respond with a 200 status code", async () => {
            const response = await (await request(patients).post("/patients"))
        })
        expect(response.statusCode).toBe(200)
    })
})







module.exports = app