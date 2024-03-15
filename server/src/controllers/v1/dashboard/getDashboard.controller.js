
const getDashboards = ({ dashboardService }) => async (req, res) => {
  const { id_user } = req;
  try {
    const { dashboards } = await dashboardService.getDashboardsByIdUser(id_user);
    return res.status(200).json({ success: true, data: { dashboards_user: dashboards } });
  } catch (e) {
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
};

module.exports = getDashboards;
