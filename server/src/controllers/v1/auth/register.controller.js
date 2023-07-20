const serviceUsers = require("../../../database/services/users.service");
const serviceHashPassword = require("../../../tools/hashPassword.tool");
const generateToken = require("../../../tools/generateToken.tool");

const registerUser = async (req, res) => {
  try {
    const bd_resp = await serviceUsers.insertUser(req.body);
    if (!bd_resp.succes) {
      return res.status(200).json(bd_resp);
    }
    const token = generateToken(req.body);
    return res.status(200).json({
      id_user: bd_resp._id,
      username: [true, bd_resp.username],
      password: true,
      token: token,
    });

  } catch (e) {
    return res.status(500).json({ messageError: e.message });
  }
};
module.exports = registerUser;
