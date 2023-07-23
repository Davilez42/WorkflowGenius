const serviceUsers = require("../../../database/services/users.service");
const { validateHash } = require("../../../tools/hashPassword.tool");
const generateToken = require("../../../tools/generateToken.tool");
const {
  passwordIncorrect,
  userNotExist,
} = require("../../../procedures/responseServer/user.procedure");
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user_db = await serviceUsers.getUser(username);

    if (!user_db) {
      return res.status(200).json(userNotExist());
    }

    if (!(await validateHash(user_db.password, password))) {
      return res.status(200).json(passwordIncorrect());
    }

    const token = generateToken({ _id: user_db.id });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      succes: true,
      data: {
        id_user: user_db._id,
        username: user_db.username,
        id_avatar: user_db.id_avatar,
        first_name: user_db.first_name,
        last_name: user_db.last_name,
        password: true,
      },
    });
  } catch (e) {
    res.status(500).json({ messageError: e.message });
  }
};

module.exports = loginUser;
