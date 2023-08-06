const { validateHash, haspassword } = require('./hashPassword.tool')
const generateToken = require('./generateToken.tool')

module.exports = {
    validateHash,
    haspassword,
    generateToken
}