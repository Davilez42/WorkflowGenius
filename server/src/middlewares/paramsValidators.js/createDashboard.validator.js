const handlerError = require("../../controllers/v1/handlerError");
const createDashParamValidator = (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      throw new handlerError(
        400,
        "keys invalid, keys valid:[name,descriptions]"
      );
    }
    if (name.trim() === "") {
      throw new handlerError(422, "name is empty ");
    }
    next();
  } catch (e) {
    res.status(e.status || 500).json({ messageError: e.message });
  }
};
module.exports = createDashParamValidator;
