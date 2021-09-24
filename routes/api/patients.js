const router = require('express').Router();
const { getAll, getBy } = require('../../models/patients.model')

router.get('/', async (req, res) => {

    try {
        console.log(req.query.keyword)
        let patients;
        if (req.query.keyword) {
            patients = await getBy(req.query);
        } else {
            patients = await getAll();
        }
        res.json(patients)
    } catch (error) {
        console.log(error)
        res.json({ error: 'no se encuentra paciente' })
    }
})



module.exports = router;