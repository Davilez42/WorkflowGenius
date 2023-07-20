const serviceDashboards = require("../../../database/services/dashboards.service");
const createDashboard = async (req, res) => {
  try {
    const name = req.params.name_dashboard;
    const id_user = req.params.id_user;
    if (name.trim() === "") {
      throw new Error("Error: El parametro :name_dashboard esta vacio");
    }
    if (isNaN(parseInt(id_user))) {
      throw new Error("Error: El parametro :id_user esta vacio");
    }
    const dashb_new = await serviceDashboards.creatNewDashboard(
      name,
      "",
      id_user
    );
    console.log(dashb_new);
    return res.status(200).json(dashb_new);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = createDashboard