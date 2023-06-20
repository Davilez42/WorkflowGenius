const config = require('../configs/config')
const {MongoClient}  =  require('mongodb') 
const getClientMongo= ()=>{
    return new MongoClient(config.URI_DB)
}
module.exports = {getClientMongo}
