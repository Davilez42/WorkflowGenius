const config = require('../configs/config')
const mongoose  =  require('mongoose') 

mongoose.connect(config.URI_DB)
.then(()=>{
    mongoose.connection.on("open",_=>console.log("open connection"))
    mongoose.connection.on("error",err=>console.log(`error connection : ${err}`))
})
.catch(err=>{
    console.log(`Error connect at  database ${config.URI_DB}`);
})

module.exports = mongoose
