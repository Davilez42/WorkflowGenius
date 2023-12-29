const app = require('./src/app')
require('./src/database/connection')
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`📕 Server Listen on: \n PORT:${PORT} \n `);
})