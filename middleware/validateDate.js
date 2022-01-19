const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const log = require('npmlog')


const validateDate = (req, res, next) => {
    const pickedDate = req.body.pickedDate;
    const formattedDate = dayjs(pickedDate, 'DD-MM-YYYY', 'es')

    if (formattedDate.isValid() && formattedDate.unix() >= dayjs().unix()) {
        next()
    } else {
        log.error('Invalid Date')
        return res.status(400).json({ error: "Invalid Date" })
    }

}



module.exports = { validateDate }