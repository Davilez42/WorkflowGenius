const validateHash = (password_bd,password_client)=>{
    return password_bd == password_client;
}

module.exports ={
    validateHash
}