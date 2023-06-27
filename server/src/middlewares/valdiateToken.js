const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const token = req.query.t_ken || req.headers["auth"];
  console.log("TOKEN EN SERVIDOR",token)
  if (!token) {
    res.status(200).json({"message":"Acceso Denegado,No se meta donde no debe deje de joder mka🤣"})
    return;
  }

  jwt.verify(token, process.env.KEY_SECRET, (err, user) => {
    if (err) {
      console.log("token vencido")
      res.status(200).json({"message":"Tu sesion ha caducado.. inicia sesion nuevamente 🤣"})
    } else {
      next();
    }
  });
};

module.exports = {
  validateToken
};
