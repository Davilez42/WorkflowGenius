const getConection = require('./util/ConfigDataBase')

const getUser = async(username)=>{
        const conection = await getConection()
        return conection.execute(`SELECT * FROM users Where username = "${username}"`)
}
const insertUser = async(datos)=>{

}
module.exports = {
        getUser,insertUser
}