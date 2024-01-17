const { ObjectId } = require("mongodb");

module.exports = dashboardService = (dashBoardModel, dashboardTemplateModel) => ({
  getDashboardsByIdUser: async (id_aut) => {
    return await dashBoardModel.find({ id_aut });
  },
  getDashboardById: async (id_dashboard) => {
    return await dashBoardModel.findById(id_dashboard).select('_id id_aut name')
  },
  createNewDashboard: async (dashboard) => {
    const new_dash = new dashBoardModel(
      dashboardTemplateModel(dashboard)
    );
    return await new_dash.save();
  }
  ,
  deleteDashboard: async (id_dashboard) => {
    return await dashBoardModel.deleteOne({ _id: id_dashboard })
  },

  setTaskInSession: async (id_dashboard, id_session, title) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);

    if (!dash_db) return;

    const _id = new ObjectId();

    dash_db.sessions.map((s) => {
      if (s._id.toString() === id_session) {
        s.tasks.push({ _id, title });
      }
    });
    await dash_db.save();
    return { _id, title };
  }
  ,
  deleteTaskOfSession: async (id_dashboard, id_session, id_task) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) return;
    dash_db.sessions.map((s) => {
      if (s._id.toString() === id_session) {
        s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
      }
    });
    const resp = await dash_db.save();
    return resp;
  },
  setSession: async (id_dashboard, name) => {
    const dashboard_db = await dashBoardModel.findById(id_dashboard)

    const _id = new ObjectId()

    const session_insert = { _id, name, tasks: [] }
    dashboard_db.sessions.push(session_insert)

    await dashboard_db.save()

    return session_insert
  },
  deleteSession: async (id_session, id_dashboard) => {
    const dashb_db = await dashBoardModel.findById(id_dashboard);

    dashb_db.sessions = dashb_db.sessions.filter(s => s._id.toString() !== id_session);

    const { id_aut, updatedAt } = await dashb_db.save()

    return { success: true, id_dashboard, id_session, id_aut, updatedAt }
  }
}
)
