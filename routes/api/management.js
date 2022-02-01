const router = require('express').Router();
const log = require('npmlog')
const { addQueryToDB } = require('../../models/management.model')
const { sendEmail } = require('../../services/emailService')


router.post('/contact', async (req, res) => {
    /* 	#swagger.tags = ['Management']
        #swagger.description = 'Endpoint to create contact us queries' */

    /*	#swagger.parameters['Payload'] = {
         in: 'body',
         description:  'contact us form content',
         required: true,
         schema: { $ref: '#/definitions/ContactUsForm' }
 } */
    const { name, email, subject, message } = req.body
    try {
        await addQueryToDB(name, email, subject, message)
        await sendEmail(email)
        log.info('contactUs', 'added to database')
        res.status(201).json()
    } catch (err) {
        log.error('contactUs', 'Bad Request', err)
        res.status(400).json({ error: "Bad Request" })
    }
})



module.exports = router



