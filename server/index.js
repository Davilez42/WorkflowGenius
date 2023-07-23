const app  = require('./src/app')
const config = require('./configs/config')


app.listen(config.PORT,config.HOST,()=>{
    console.log(`📕 Server Listen on: \n PORT:${config.PORT} \n HOST:${config.HOST}`);
})