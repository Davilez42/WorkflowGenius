module.exports = {
    PORT:5000,
    HOST:'192.168.1.7',
    URI_DB:"mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1",
    CONFIG_CORS:{
        origin:["http://localhost:3000"]
    }
}