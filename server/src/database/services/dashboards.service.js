const dashBoardModel = require("../Models/dashBoardModel");
const {
  dashboardTempleteModel,
} = require("../../helpers/templeteModelDashboard");
const { ObjectId } = require("mongodb");

require("../Models/userModel");
require("../connection");

const getDashboardsByIdUser = async (id_aut) => {
  return await dashBoardModel.find({ id_aut });
};

const creatNewDashboard = async (name, description, id_aut) => {
  const new_dash = new dashBoardModel(
    dashboardTempleteModel(name, description, id_aut)
  );
  return await new_dash.save();
};

const setTaskinDashboard = async (id_dashboard, id_sesion, title) => {
  const dash_db = await dashBoardModel.findById(id_dashboard);
  if (!dash_db) return;

  const _id = new ObjectId();

  dash_db.sesions.map((s) => {
    if (s._id.toString() === id_sesion) {
      s.tasks.push({ _id, title });
    }
  });

  return await dash_db
    .save()
    .then((d) => {
      return { _id, title };
    })
    .catch((err) => {
      return err;
    });
};

const deleteTaskDashboard = async (id_dashboard, id_sesion, id_task) => {
  const dash_db = await dashBoardModel.findById(id_dashboard);
  if (!dash_db) return;
  dash_db.sesions.map((s) => {
    if (s._id.toString() === id_sesion) {
      s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
    }
  });
  return dash_db.save();
};

module.exports = {
  getDashboardsByIdUser,
  creatNewDashboard,
  setTaskinDashboard,
  deleteTaskDashboard,
};
