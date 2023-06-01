const bd = require("mysql2/promise");
 
 const getConection = ()=>{
    config = {
        host: 'localhost',
        user: 'root',
        database: 'adtask',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
    };
   return  bd.createConnection(config);   
}

module.exports = getConection