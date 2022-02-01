const router = require('express').Router();
const log = require('npmlog')
const { getDiseases } = require('../../models/patients.model');
const { getDoctors } = require('../../models/appointments.model');
const { authenticateToken } = require('../../middleware/tokenAuthentication');

router.get('/doctors', async (req, res) => {
    /* 	#swagger.tags = ['Catalogs']
       #swagger.description = 'Endpoint to get data from doctors' */
    try {
        const doctors = await getDoctors()
        if (doctors) {
            log.info('getDoctors', 'get doctors successfully')
            res.json(doctors)
        } else {
            log.error('getDoctors', 'doctors not found')
            res.status(404).json({ error: "doctors not found" })
        }

    } catch (err) {
        log.error('getDoctors', 'internal error', err)
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/diseases', authenticateToken, async (req, res) => {
    /* 	#swagger.tags = ['Catalogs']
       #swagger.description = 'Endpoint to get all the diseases list' */
    try {
        const diseases = await getDiseases()
        if (diseases) {
            log.info('getDiseases', 'get diseases successfully')
            res.json(diseases)
        } else {
            log.error('getDiseases', 'diseases not found')
            res.status(404).json({ error: "diseases not found" })
        }

    } catch (err) {
        log.error('getDiseases', 'internal error', err)
        res.status(500).json({ error: "Internal Error" })
    }

})



module.exports = router;