const router = require('express').Router();
const log = require('npmlog')
const { authenticateToken } = require('../../middleware/tokenAuthentication');
const { getAllAppointmentsFromDoctor } = require('../../models/appointments.model')




router.get('/:id/appointments', authenticateToken, async (req, res) => {
    try {
        res.status(200)
        const { id } = req.params
        const appointments = await getAllAppointmentsFromDoctor(id)
        console.log(appointments)
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