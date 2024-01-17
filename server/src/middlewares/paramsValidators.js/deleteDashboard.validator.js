const { isObjectIdOrHexString, Types } = require('mongoose')
const deleteDashParamValidator = (req, res, next) => {

    try {
        const { id_dashboard } = req.params
        if (!isObjectIdOrHexString(id_dashboard)) {
            return res.status(400).json({ message: 'The id format is incorrect' })
        }

        next()
    } catch (e) {
        res.status(500).json({ errorMessage: 'Internal server error' })
    }
}




module.exports = deleteDashParamValidator
