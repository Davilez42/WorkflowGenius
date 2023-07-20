const express = require("express");
const cors = require("cors");

require("colors"); //* DEV
const routesv1 = require("./src/routes/v1");
const routeNotFoundHandler = require("./src/middlewares/routeNotFoundHandler");
const logger = require("./src/middlewares/logger");
const  cookieParser =  require('cookie-parser')
const config = require("./src/configs/config");
const app = express();

app.use(logger);
// PARSERS
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(config.CONFIG_CORS));

// ROUTES
app.get("/", (req, res) => {
  return res.json({ message: " Welcome To 📕 WorkflowGenius Server !" });
});

app.use("/api/v1", routesv1);

app.use(routeNotFoundHandler);

module.exports = app;
