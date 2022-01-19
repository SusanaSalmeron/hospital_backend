const router = require('express').Router();
const log = require('npmlog')
const { getAll, getBy, getById, getRecordById, addNewRecord, getDiseases, modifyPatientData } = require('../../models/patients.model');
const { getAppointmentsByPatientId, addNewAppointment, changeAppointment, deleteAppointment, getDoctors } = require('../../models/appointments.model');
const { authenticateToken, authorizeDoctor } = require('../../middleware/tokenAuthentication');
const dayjs = require('dayjs');
const { validateDate } = require('../../middleware/validateDate');

//Patient related operations
router.get('/', authenticateToken, authorizeDoctor, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get patients by keyword' */

    /*	#swagger.parameters['keyword'] = {
            in: 'query',
            description: 'Key word to search for any patients',
            required: false
    } */
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

router.get('/:id', authenticateToken, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get patients by id' */

    /*	#swagger.parameters['id'] = {
            in: 'path',
            description: 'Id for a patient',
            required: true
    } */
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

router.put('/:id', authenticateToken, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
      #swagger.description = 'Endpoint to modify data from a patient' */

    /*	#swagger.parameters['id'] = {
            in: 'path',
            description:  'id from patient',
            required: true
    } */
    /*	#swagger.parameters['obj'] = {
           in: 'body',
           description:  'patient data',
           required: true,
           schema: { $ref: '#/definitions/ModifyPatientData' }
   } */
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

// Patients' appointments operations 
router.get('/:id/appointments', authenticateToken, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get appointments from a patient' */

    /*	#swagger.parameters['id'] = {
            in: 'path',
            description: 'Id for a patient',
            required: true
    } */
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

router.post('/:id/appointments', authenticateToken, validateDate, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
       #swagger.description = 'Endpoint to add an appointment to a patient' */

    /*	#swagger.parameters['id'] = {
          in: 'path',
          description:  'Id for a patient',
          required: true
  } */

    /*	#swagger.parameters['obj'] = {
          in: 'body',
          description:  'Id for a patient',
          required: true,
          schema: { $ref: '#/definitions/NewAppointment' }
  } */

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

router.delete('/:id/appointments/:appId', authenticateToken, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
      #swagger.description = 'Endpoint to delete an appointment from a patient' */

    /*	#swagger.parameters['id'] = {
            in: 'path',
            description:  'id from patient',
            required: true
    } */
    /*	#swagger.parameters['appId'] = {
            in: 'path',
            description:  'id from an appointment',
            required: true
    } */
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

// Patients' records operations
router.get('/:id/records', authenticateToken, authorizeDoctor, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
        #swagger.description = 'Endpoint to get clinical record from a patient' */

    /*	#swagger.parameters['id'] = {
            in: 'path',
            description:  'Id for a patient',
            required: true
    } */
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

router.post('/:id/records', authenticateToken, authorizeDoctor, async (req, res) => {
    /* 	#swagger.tags = ['Patients']
      #swagger.description = 'Endpoint to add a clinical record from a patient' */
    /*	#swagger.parameters['id'] = {
           in: 'path',
           description:  'id from patient',
           required: true
   } */
    /*	#swagger.parameters['payload'] = {
      in: 'body',
      description:  'Payload for creating a new record',
      required: true,
      schema: { $ref: '#/definitions/NewRecord' }
    } */

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

module.exports = router;