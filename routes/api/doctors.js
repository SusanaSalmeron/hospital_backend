

const router = require('express').Router();
const log = require('npmlog')
const { authenticateToken, authorizeDoctor } = require('../../middleware/tokenAuthentication');
const { getAllAppointmentsFromDoctor } = require('../../models/appointments.model')

router.get('/:id/appointments', authenticateToken, authorizeDoctor, async (req, res) => {
    /* 	#swagger.tags = ['Doctors']
      #swagger.description = 'Endpoint to get all appoitments from a doctor' */
    /*	#swagger.parameters['id'] = {
            in: 'path',
            description:  'id from doctor',
            required: true
    } */
    try {
        const { id } = req.params
        const appointments = await getAllAppointmentsFromDoctor(id)
        if (appointments) {
            log.info("getAppointments", 'get appointments successfully')
            res.status(200).json(appointments)
        } else {
            log.info("getApppointments", "No appointments")
            res.status(404).json({ error: "No appointments" })
        }
    } catch (err) {
        log.error('getAppointments', 'Internal Error', err)
        res.status(500).json({ error: "internal Error" })
    }
})

module.exports = router;