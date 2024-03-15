const { startSession } = require("mongoose");
const { ObjectId } = require('mongodb')

module.exports = dashboardService = ({ dashBoardModel, userModel }, dashboardTemplateModel) => ({
  getDashboardsByIdUser: async (_id) => {
    const resp_db = await userModel.findOne({ _id }, 'dashboards').populate({ path: 'dashboards' })
    return resp_db
  },
  getDashboardById: async (id_dashboard) => {
    const resp_db = await dashBoardModel.findById(id_dashboard).populate({ path: 'members.user', select: '_id username email id_avatar' })
    return resp_db
  },
  createNewDashboard: async (dashboard) => {
    const session_ = await startSession();
    session_.startTransaction()

    try {
      const new_dsh = dashboardTemplateModel(dashboard)
      new_dsh['members'] = [{ user: dashboard.id_aut, role: 'admin' }]
      const dsh_ = new dashBoardModel(new_dsh)
      const { _id, sections, name, id_aut, description } = await dsh_.save({ session: session_ })

      await userModel.updateOne({ _id: dashboard.id_aut }, { $push: { dashboards: _id } }, { session: session_ })
      await session_.commitTransaction();

      return { _id, sections, name, id_aut, description }
    } catch (e) {
      console.log(e);
      await session_.abortTransaction()
    }
    finally {
      await session_.endSession()
    }

  }
  ,
  deleteDashboard: async (id_dashboard, id_user) => {
    const session = await startSession();
    session.startTransaction()
    try {

      await userModel.updateOne({ _id: id_user }, { $pullAll: { dashboards: [id_dashboard] } }, { session })

      const { members } = await dashBoardModel.findOneAndDelete({ _id: id_dashboard }, { session })

      await userModel.updateMany({ _id: { $in: members.map(u => u.user) } }, { $pullAll: { dashboards: [id_dashboard] } }, { session })

      await session.commitTransaction();
    } catch (e) {
      console.log(e);
      await session.abortTransaction()
    }
    finally {
      await session.endSession()
    }
  },

  leaveDashboard: async (id_user, id_dash) => {
    const resp_db = await userModel.updateOne({ _id: id_user }, { $pullAll: { dashboards: [id_dash] } })
    console.log(resp_db);
  },

  setTaskInSection: async (id_dashboard, id_section, title) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) throw new Error('Dashboard not found');;
    const _id = new ObjectId();
    dash_db.sections.map((s) => {
      if (s._id.toString() === id_section) {
        s.tasks.push({ _id, title });
      }
    });
    await dash_db.save();
    return { _id, title };
  }
  ,
  deleteTaskOfSection: async (id_dashboard, id_section, id_task) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) throw new Error('Dashboard not found');
    dash_db.sections.map((s) => {
      if (s._id.toString() === id_section) {
        s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
      }
    });
    const resp = await dash_db.save();
    return resp;
  },
  moveTask: async (id_dashboard, from_section, to_section, id_task) => {
    const dash_db = await dashBoardModel.findById(id_dashboard, 'sections');
    if (!dash_db) throw new Error('Dashboard not found');
    const fromSection = dash_db.sections.find(s => s._id.toString() === from_section);
    const task = fromSection?.tasks.find(t => t._id.toString() === id_task);
    if (!task) throw new Error('task not found');
    dash_db.sections.map(s => {
      if (s._id.toString() === from_section) {
        s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
      }
      if (s._id.toString() === to_section) {
        s.tasks.push(task)
      }
    })
    await dash_db.save()
    return task
  },
  setSection: async (id_dashboard, name) => {
    const _id = new ObjectId()
    const section_insert = { _id, name, tasks: [] }
    const resp_db = await dashBoardModel.updateOne({ _id: id_dashboard }, { $push: { sections: section_insert } })
    return section_insert
  },
  deleteSection: async (id_section, id_dashboard) => {
    const dash_db = await dashBoardModel.findById(id_dashboard);
    if (!dash_db) throw new Error('Dashboard not found');
    dash_db.sections = dash_db.sections.filter(s => s._id.toString() !== id_section);
    await dash_db.save()
  }
}
)
