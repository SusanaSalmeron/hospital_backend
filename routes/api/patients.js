const router = require('express').Router();
const { getAll, getBy, getById, getRecordById, addNewRecord } = require('../../models/patients.model')


router.get('/:id', async (req, res) => {
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

router.get('/:id/record', async (req, res) => {
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
})

router.get('/', async (req, res) => {
    try {
        let patients;
        if (req.query.keyword) {
            patients = await getBy(req.query);
        } else {
            patients = await getAll();
        }
        res.json(patients)
    } catch (error) {
        res.json({ error: 'Patient not found' })
    }
})

router.post('/:id/record/add', async (req, res) => {
    const { diagnostics, description } = req.body
    const { id } = req.params

    const recordAdded = await addNewRecord(id, diagnostics, description)
    if (recordAdded) {
        res.status(200).send();
    } else {
        res.status(404).json({ error: "There is no new record to push" })
    }
})



module.exports = router;