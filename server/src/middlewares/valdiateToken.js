const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(500).json({ message: "Token not found" });
    }
    await jwt.verify(token, process.env.KEY_SECRET);

    const data = await jwt.decode(token);

    req.id_user = data._id;

    next();
  } catch (error) {
    res.status(511).json({ message: "auth token corrupted" });
  }
};

module.exports = {
  validateToken,
};
