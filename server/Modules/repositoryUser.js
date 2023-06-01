const getConection = require('./util/ConfigDataBase')

const getUser = async(username)=>{
        const conection = await getConection()
        return conection.execute(`SELECT * FROM users Where username = "${username}"`)
}

module.exports = {
        getUser
}