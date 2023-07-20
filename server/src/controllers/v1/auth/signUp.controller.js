const serviceUsers = require("../../../database/services/users.service");
const serviceHashPassword = require("../../../tools/hashPassword.tool");
const generateToken = require("../../../tools/generateToken.tool");
const {
  emailAlreadyExist,
  userNameAlreadyExist,
} = require("../../../procedures/responseServer/user.procedure");
const registerUser = async (req, res) => {
  try {
    const { succes, email, username, user_created } =
      await serviceUsers.insertUser(req.body);

    if (!succes) {
      if (!email) {
        return res.status(200).json(emailAlreadyExist());
      }
      if (!username) {
        return res.status(200).json(userNameAlreadyExist());
      }
    }
    const token = generateToken({ _id: user_created.id });
    return res.status(200).json({
      succes,
      data: {
        _id: user_created._id,
        username: user_created.username,
        first_names: user_created.first_names,
        last_names: user_created.last_names,
        password: true,
        token: token,
      },
    });
  } catch (e) {
    return res.status(500).json({ messageError: e.message });
  }
};
module.exports = registerUser;
