

const { ObjectId } = require("mongodb");

module.exports = dashboardService = (dashBoardModel, dashboardTempleteModel) => ({

  getDashboardsByIdUser: async (id_aut) => {
    return await dashBoardModel.find({ id_aut });
  },
  getDashboardById: async (id_dashboard) => {
    return await dashBoardModel.findById(id_dashboard).select('_id id_aut name')
  },
  creatNewDashboard: async (dashboard) => {
    const new_dash = new dashBoardModel(
      dashboardTempleteModel(dashboard)
    );
    return await new_dash.save();
  }
  ,
  deleteDashboard: async (id_dashboard) => {
    return await dashBoardModel.deleteOne({ _id: id_dashboard })
  },

  setTaskinDashboard: async (id_dashboard, id_sesion, title) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) return;

    const _id = new ObjectId();

    dash_db.sesions.map((s) => {
      if (s._id.toString() === id_sesion) {
        s.tasks.push({ _id, title });
      }
    });
    await dash_db.save();
    return { _id, title };
  }
  ,
  deleteTaskDashboard: async (id_dashboard, id_sesion, id_task) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) return;
    dash_db.sesions.map((s) => {
      if (s._id.toString() === id_sesion) {
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
    dashboard_db.sesions.push(session_insert)

    await dashboard_db.save()

    return session_insert
  }

}
)
