const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = express.Router()

const users = require('./routes/api/users')
const doctors = require('./routes/api/doctors')
const patients = require('./routes/api/patients')
const catalogs = require('./routes/api/catalogs')
const management = require('./routes/api/management')

router.use('/v1/users', users)
router.use('/v1/doctors', doctors)
router.use('/v1/patients', patients)
router.use('/v1/catalogs', catalogs)
router.use('/v1/managements', management)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;