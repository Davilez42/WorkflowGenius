const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res.status(500).json({ message: "Token not found" });
    }
    await jwt.verify(token, process.env.JWT_KEY_SECRET);
    const data = jwt.decode(token);
    req.id_user = data._id;
    next();
  } catch (e) {
    res.status(511).json({ message: "auth token corrupted" });
  }
};

module.exports = {
  validateToken,
};
