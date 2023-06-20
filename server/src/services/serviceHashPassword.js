const bcrypt = require('bcryptjs')

const validateHash = async(password_bd,password_client)=>{
    return bcrypt.compare(password_client,password_bd);
}
const haspassword = async(password)=>{
    return bcrypt.hash(password,13)
}
module.exports ={
    validateHash,haspassword
}