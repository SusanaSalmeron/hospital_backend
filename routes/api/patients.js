const router = require('express').Router();
const { getAll, getBy, getById, getRecordById, addNewRecord, getOptions } = require('../../models/patients.model');
const { getAppointById } = require('../../models/appointments.model');
const { authenticateToken } = require('../../middleware/tokenAuthentication')


router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const patient = await getById(req.params.id)
        if (patient) {
            res.json(patient)
        } else {
            res.status(404).json({ error: "Id not found" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/:id/record', authenticateToken, async (req, res) => {
    if (req.role = "sanitario") {
        try {
            const record = await getRecordById(req.params.id)
            if (record) {
                res.json(record)
            } else {
                res.status(404).json({ error: "Record not found" })
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Error" })
        }
    } else {
        res.status(403).json({ error: "Forbidden" })
    }
})

router.get('/options', async (req, res) => {
    try {
        const options = await getOptions(req)
        if (options) {
            res.json(options)
        } else {
            res.status(404).json({ error: "Option not found" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        let patients;
        if (req.query.keyword) {
            patients = await getBy(req.query);
        } else {
            patients = await getAll();
        }
        console.log(patients)
        res.json(patients)
    } catch (error) {
        res.status(500).json({ error: 'Internal Error' })
    }
})

router.get('/:id/appointments', authenticateToken, async (req, res) => {
    try {
        const patient = await getAppointById(req.params.id)
        if (patient) {
            res.json(patient)
        } else {
            res.status(404).json({ error: "Id not found" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.post('/:id/record/add', authenticateToken, async (req, res) => {
    const { diagnostics, description } = req.body
    const { id } = req.params
    if (req.role = "sanitario") {
        try {
            const recordAdded = await addNewRecord(id, diagnostics, description)
            if (recordAdded) {
                res.status(200).send();
            } else {
                res.status(404).json({ error: "There is no new record to push" })
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Error" })
        }
    } else {
        res.status(403).json({ error: "Forbidden" })
    }
})

router.post('/:id/appointments/add', authenticateToken, async (req, res) => {

})






module.exports = router;