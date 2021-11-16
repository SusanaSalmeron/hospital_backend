const router = require('express').Router();
const { getAll, getBy, getById, getRecordById, addNewRecord, getOptions } = require('../../models/patients.model');
const { getAppointmentsByPatientId, addNewAppointment, changeAppointment, deleteAppointment, getDoctors } = require('../../models/appointments.model');
const { authenticateToken } = require('../../middleware/tokenAuthentication');
const dayjs = require('dayjs');


router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id
        console.log("Aqui sale un " + id)
        const patient = await getById(id)
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
        const patient = await getAppointmentsByPatientId(req.params.id)
        if (patient) {
            res.json(patient)
        } else {
            res.status(404).json({ error: "Patient not found" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/appointments/doctors', authenticateToken, async (req, res) => {
    try {
        const doctors = await getDoctors()
        if (doctors) {
            res.json(doctors)
        } else {
            res.status(404).json({ error: "doctors not found" })
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
    const { calendar, doctor } = req.body
    let date = dayjs(calendar).format('DD/MM/YYYY')
    const { id } = req.params
    try {
        const appointmentAdded = await addNewAppointment(id, date, doctor)
        if (appointmentAdded) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: "No appointment" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.put('/:id/appointments/:appId', authenticateToken, async (req, res) => {
    const { pickedDate, doctor } = req.body
    let date = dayjs(pickedDate).format('DD/MM/YYYY')
    const { id, appId } = req.params
    try {
        const appointmentModified = await changeAppointment(id, date, appId, doctor)
        if (appointmentModified) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})

router.delete('/:id/appointments/:appId', authenticateToken, async (req, res) => {
    const { id, appId } = req.params
    try {
        const appointmentDeleted = await deleteAppointment(id, appId)
        if (appointmentDeleted) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Error" })
    }
})





module.exports = router;