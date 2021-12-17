const router = require('express').Router();

apiUsersRouter = require('./api/users');
apiPatientsRouter = require('./api/patients');
apiDoctorsRouter = require('./api/doctors');


router.use('/users', apiUsersRouter);
router.use('/patients', apiPatientsRouter);
router.use('/doctors', apiDoctorsRouter);



module.exports = router;