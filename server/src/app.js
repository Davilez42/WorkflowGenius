const express = require("express");
const cors = require("cors");

require("colors"); //* DEV
const routeNotFoundHandler = require("./middlewares/routeNotFoundHandler");
const logger = require("./middlewares/logger");
const cookieParser = require("cookie-parser");
const mainSocket = require('./sockets/mainSocket')
const config = require("../configs/config");
const routesV1 = require("./routes/v1");
const app = express();

//CONFIGURACION SOCKETS
const http = require("http");
const server = http.createServer(app);
mainSocket(server)

app.disabled('x-Powered-by')
app.use(logger);
// PARSERS
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(config.CONFIG_CORS));

// ROUTES
app.get("/", (req, res) => {
  return res.json({ message: " Welcome To 📕 WorkflowGenius Server !" });
});
app.use("/api/v1", routesV1);
app.use(routeNotFoundHandler);

module.exports = server;
