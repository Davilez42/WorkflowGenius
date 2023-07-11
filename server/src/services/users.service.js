require("./connection");
const { haspassword } = require("./hashPassword.service");
const userModel = require("./Models/userModel");

const getUser = async (username) => {
  const user = await userModel.findOne({ username });
  return user;
};

const insertUser = async (datos) => {
  const { username, email } = datos;
  const user = await userModel.findOne({ username });
  const user_email = await userModel.findOne({ email });
  if (user) {
    return { succes: false, value: "username" };
  }
  if (user_email) {
    return { succes: false, value: "email" };
  }
  datos["state_user"] = true;
  datos["recent_sesion"] = new Date();
  const hashed_password = await haspassword(datos["password"]);
  datos["password"] = hashed_password;

  const user_Mod = new userModel(datos);
  const res = await user_Mod.save();
  console.log(res);
  return { succes: true, res };
};
module.exports = {
  getUser,
  insertUser,
};
