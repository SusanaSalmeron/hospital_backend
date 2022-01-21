const validateDate = require('../middleware/validateDate')
const dayjs = require('dayjs')


describe('validate a date', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    const mockRequest = (date) => {
        return {
            body: date
        };
    };

    test('should fail is there is no pickedDate ', () => {
        const response = mockResponse()
        const next = jest.fn()
        validateDate.validateDate(mockRequest({}), response, next)
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "Invalid Date" })
        expect(next).not.toHaveBeenCalled()
    })
    test('should validate pickedDate', () => {
        const request = mockRequest({ pickedDate: "31-12-2039" })
        const response = mockResponse()
        const next = jest.fn()
        validateDate.validateDate(request, response, next)
        expect(response.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    test('should not validate pickedDate', () => {
        const request = mockRequest({ pickedDate: "01-01-2020" })
        const response = mockResponse()
        const next = jest.fn()
        validateDate.validateDate(request, response, next)
        expect(response.status).toHaveBeenCalledWith(400)
        expect(response.json).toHaveBeenCalledWith({ error: "Invalid Date" })
        expect(next).not.toHaveBeenCalled()

    })
})