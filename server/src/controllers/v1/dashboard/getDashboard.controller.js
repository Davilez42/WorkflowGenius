const serviceDashboards = require("../../../database/services/dashboards.service");
const getDashboards = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const respuesta = await serviceDashboards.getDashboardsByIdUser(id_user);
    console.log(respuesta);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = getDashboards;
