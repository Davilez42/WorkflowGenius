const serviceDashboards = require("../../../database/services/dashboards.service");



const createDashboard = async (req, res) => {
  const { id_user } = req;
  const { name, description } = req.body;
  try {
    const dash_new = await serviceDashboards.creatNewDashboard({
      name,
      description,
      id_aut: id_user
    }
    );
    return res.status(200).json({
      succes: true,
      data: {
        dash_new,
      },
    });
  } catch (e) {
    res.status(500).json({ messageError: e.message });
  }
};
module.exports = createDashboard;
