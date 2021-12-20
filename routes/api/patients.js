const router = require('express').Router();
const log = require('npmlog')
const { getAll, getBy, getById, getRecordById, addNewRecord, getDiseases, modifyPatientData } = require('../../models/patients.model');
const { getAppointmentsByPatientId, addNewAppointment, changeAppointment, deleteAppointment, getDoctors } = require('../../models/appointments.model');
const { authenticateToken, authorizeDoctor } = require('../../middleware/tokenAuthentication');
const dayjs = require('dayjs');

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const { name, email, address, postalZip, region, country, phone, ssnumber, company } = req.body
    try {
        const newData = await modifyPatientData(id, name, email, address, postalZip, region, country, phone, ssnumber, company)
        if (newData) {
            log.info('modifyPatientData', 'patient data successfully modified')
            res.status(200).send()
        } else {
            log.info('modifyPatientData', 'patient data not modified')
            res.status(404).json({ error: "no patient found" })
        }
    } catch (err) {
        log.error('modifyPatientData', 'Internal Error', err)
        res.status(500).json({ error: "internal error" })
    }
})


router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id
        const patient = await getById(id)
        if (patient) {
            log.info('getPatientById', 'get user successfully')
            res.json(patient)
        } else {
            log.error('getPatientById', 'Id not found')
            res.status(404).json({ error: "Id not found" })
        }
    } catch (err) {
        log.error('getPatientById', 'Internal Error', err)
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/:id/record', authenticateToken, async (req, res) => {
    if (req.role = "sanitario") {
        try {
            const record = await getRecordById(req.params.id)
            if (record) {
                log.info('getRecords', 'records getting successfully')
                res.json(record)
            } else {
                log.error('getRecords', 'Records not found')
                res.status(404).json({ error: "Records not found" })
            }
        } catch (err) {
            log.error('getRecords', 'Internal Error', err)
            res.status(500).json({ error: "Internal Error" })
        }
    } else {
        log.error('getRecords', 'Forbidden')
        res.status(403).json({ error: "Forbidden" })
    }
})

router.get('/', authenticateToken, authorizeDoctor, async (req, res) => {
    try {
        let patients;
        if (req.query.keyword) {
            patients = await getBy(req.query);
        } else {
            patients = await getAll();
        }
        log.info('getPatients', 'get patients successfully')
        res.json(patients)
    } catch (err) {
        log.error('getPatients', 'Internal Error', err)
        res.status(500).json({ error: 'Internal Error' })
    }
})

router.get('/:id/appointments', authenticateToken, async (req, res) => {
    try {
        const patient = await getAppointmentsByPatientId(req.params.id)
        if (patient) {
            log.info('getAppointmentsByPatient', 'get appointments successfully')
            res.json(patient)
        } else {
            log.error('getAppoinmentsByPatient', 'Patient not found')
            res.status(404).json({ error: "Patient not found" })
        }
    } catch (err) {
        log.error('getAppoinmentsByPatient', 'Internal Error', err)
        res.status(500).json({ error: "Internal Error" })
    }
})

router.get('/appointments/doctors', authenticateToken, async (req, res) => {
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

router.get('/record/diseases', authenticateToken, async (req, res) => {
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

router.post('/:id/record/add', authenticateToken, async (req, res) => {
    const { diagnostics, description } = req.body
    const { id } = req.params
    if (req.role = "sanitario") {
        try {
            const recordAdded = await addNewRecord(id, diagnostics, description)
            if (recordAdded) {
                log.info('addRecord', 'add record successfully')
                res.status(200).send();
            } else {
                log.error('addRecord', 'there is not new record to push')
                res.status(404).json({ error: "There is not new record to push" })
            }
        } catch (err) {
            log.error('addRecord', 'internal error', err)
            res.status(500).json({ error: "Internal Error" })
        }
    } else {
        log.error('addRecord', 'Forbidden')
        res.status(403).json({ error: "Forbidden" })
    }
})

router.post('/:id/appointments/add', authenticateToken, async (req, res) => {
    const { pickedDate, doctor } = req.body
    let date = pickedDate
    const { id } = req.params
    try {
        const appointmentAdded = await addNewAppointment(id, date, doctor)
        if (appointmentAdded) {
            log.info('addAppointment', 'add appointment successfully')
            res.status(200).send();
        } else {
            log.error('addAppointment', 'no appointment')
            res.status(404).json({ error: "No appointment" })
        }
    } catch (err) {
        log.error('addAppointment', 'internal error', err)
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
            log.info('modifyAppointment', 'modify appointment successfully')
            res.status(200).send();
        }
    } catch (err) {
        log.error('modifyAppointment', 'internal error', err)
        res.status(500).json({ error: "Internal Error" })
    }
})



router.delete('/:id/appointments/:appId', authenticateToken, async (req, res) => {
    const { id, appId } = req.params
    try {
        const appointmentDeleted = await deleteAppointment(id, appId)
        if (appointmentDeleted) {
            log.info('deleteAppointment', 'delete appointment successfully')
            res.status(200).send();
        }
    } catch (err) {
        log.error('deleteAppointment', 'internal error', err)
        res.status(500).json({ error: "Internal Error" })
    }
})


module.exports = router;