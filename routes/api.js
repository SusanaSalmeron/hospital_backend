const router = require('express').Router();

apiUsersRouter = require('./api/users');
apiPatientsRouter = require('./api/patients');


router.use('/users', apiUsersRouter);
router.use('/patients', apiPatientsRouter);


module.exports = router;