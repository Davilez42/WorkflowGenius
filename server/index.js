const app = require('./src/app')
const config = require('./configs/config')
require('./src/database/connection')

app.listen(config.PORT, () => {
    console.log(`📕 Server Listen on: \n PORT:${config.PORT} \n HOST:${config.HOST}`);
})