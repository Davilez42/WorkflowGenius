require("../connection");
const { haspassword } = require("../../tools/hashPassword.tool");
const userModel = require("../Models/userModel");

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
  const hashed_password = await haspassword(datos["password"]);
  datos["password"] = hashed_password;

  const user_Mod = new userModel(datos);
  const res = await user_Mod.save();

  return { succes: true, res };
};
module.exports = {
  getUser,
  insertUser,
};
