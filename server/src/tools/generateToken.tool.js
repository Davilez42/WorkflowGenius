const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (data) => {
  return jwt.sign(JSON.stringify(data), process.env.KEY_SECRET);
};

module.exports = generateToken