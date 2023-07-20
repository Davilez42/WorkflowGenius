const handlerError = require("../../controllers/v1/handlerError");
const loginParamsValidator = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new handlerError(
        400,
        "Keys invalid: Keys valid:[username,password]"
      );
    }
    if (username.trim() === "" || password.trim() === "") {
      throw new handlerError(422, "Values empty");
    }
    if (username.split(" ").length > 1 || password.split(" ").length > 1) {
      throw new handlerError(422, "Error: format invalid");
    }
    next();
  } catch (e) {
    res.status(e.status).json({ messageError: e.message });
  }
};
module.exports = loginParamsValidator;
