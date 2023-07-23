const handlerError = require("../../controllers/v1/handlerError");
const registerParamsValidator = (req, res, next) => {
  //? middleware para validar parametros del endpoint refistro
  try {
    const { username, password, email, first_names, last_names } = req.body;

    if (!username || !password || !first_names || !last_names || !email) {
      throw new handlerError(400, "Keys invalid");
    }
    if (
      username == "" ||
      password == "" ||
      first_names == "" ||
      last_names == "" ||
      email == ""
    ) {
      throw new handlerError(422, "values empty");
    }
    if (
      username.split(" ").length > 1 ||
      password.split(" ").length > 1 ||
      email.split(" ").length > 1
    ) {
      throw new handlerError(422, "format invalid");
    }
    next()
  } catch (e) {
    console.log(e);
    return res.status(e.status).json({ errorMessage: e.message });
  }
};

module.exports = registerParamsValidator;
