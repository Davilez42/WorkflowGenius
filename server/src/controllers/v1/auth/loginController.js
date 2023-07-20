const serviceUsers = require("../../../database/services/users.service");
const serviceHashPassword = require("../../../tools/hashPassword.tool");
const generateToken = require("../../../tools/generateToken.tool");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user_db = await serviceUsers.getUser(username);

    if (!user_db) {
      return res.status(200).json({succes:false,status:"USERNAME_NOT_EXIST"});
    }

    if (
      !(await serviceHashPassword.validateHash(
        user_db.password,
        password
      ))
    ) {
      return res.status(200).json({succes:false,status:"PASSWORD_INCORRECT"});
    }
    console.log(user_db);
    const token = generateToken(user_db);
    return res.status(200).json({
      succes:true,
      data:{
        token,
        username:user_db.username,
        id_avatar:user_db.id_avatar,
        first_name:user_db.first_name,
        last_name:user_db.last_name,
        password:true
      }
    });

  } catch (e) {
    res.status(500).json({ messageError: e.message });
  }
};

module.exports = loginUser;
