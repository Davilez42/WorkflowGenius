const serviceUsers = require("../services/users.service");
const serviceHashPassword = require("../services/hashPassword.service");
const generateToken = require("../services/generateToken.service");

const validateUser = async (req, res) => {
  try {
    const user = req.body;
    //validacion de parametros
    if (user.username == undefined || user.password == undefined) {
      throw new Error("Error: Entradas incorrectas");
    }
    if (user.username == "" || user.password == "") {
      throw new Error("Error: campos vacios");
    }
    if (
      user.username.split(" ").length > 1 ||
      user.password.split(" ").length > 1
    ) {
      throw new Error("Error: formato incorrecto");
    }
    //validacion de usuario
    const response_bd = await serviceUsers.getUser(user.username);
    
    if (!response_bd) {
      return res.status(200).json({ username: [false, user.username] });
    }
    if (
      !(await serviceHashPassword.validateHash(
        response_bd.password,
        user.password
      ))
    ) {
      return res.status(200).json({
        _id: response_bd._id,
        username: [true, response_bd.username],
        password: false,
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      _id: response_bd._id,
      username: [true, user.username],
      password: true,
      token: token,
      id_avatar: response_bd.id_avatar,
    });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;
    if (
      username == undefined ||
      password == undefined ||
      first_name == undefined ||
      last_name == undefined ||
      email == undefined
    ) {
      throw new Error("Error: Entradas incorrectas");
    }
    if (
      username == "" ||
      password == "" ||
      first_name == "" ||
      last_name == "" ||
      email == ""
    ) {
      throw new Error("Error: campos vacios");
    }
    if (
      username.split(" ").length > 1 ||
      password.split(" ").length > 1 ||
      email.split(" ").length > 1
    ) {
      throw new Error("Error: formato incorrecto");
    }
    const bd_resp = await serviceUsers.insertUser(req.body);
    if (!bd_resp.succes) {
      return res.status(200).json(bd_resp);
    }

    const token = generateToken(req.body);
    return res.status(200).json({
      id_user: bd_resp._id,
      username: [true, username],
      password: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ messageError: error.message });
  }
};

module.exports = { validateUser, registerUser };
