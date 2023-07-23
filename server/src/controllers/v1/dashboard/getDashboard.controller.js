const serviceDashboards = require("../../../database/services/dashboards.service");
const getDashboards = async (req, res) => {
  const { id_user } = req;
  try {
    const dashboards_user = await serviceDashboards.getDashboardsByIdUser(
      id_user
    );
    console.log(dashboards_user);
    return res.status(200).json({ succes: true, data: { dashboards_user } });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};

module.exports = getDashboards;
