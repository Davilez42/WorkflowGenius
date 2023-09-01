
const getDashboards = ({ dashboardService }) => async (req, res) => {
  const { id_user } = req;
  try {
    const dashboards_user = await dashboardService.getDashboardsByIdUser(id_user);

    return res.status(200).json({ success: true, data: { dashboards_user } });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};

module.exports = getDashboards;
