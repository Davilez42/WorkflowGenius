const { Schema, model } = require("mongoose");
const dashBoardModel = require("./Models/dashBoardModel");
const { dashboardTempleteModel } = require("../helpers/templeteModesl");
require("./Models/userModel");

require("./connection");
const getDashboardsByIdUser = async (id_aut) => {

  const dashboards = await dashBoardModel.find({id_aut});
  return dashboards;
};

const creatNewDashboard = async (name, description, id_aut) => {
  const new_dash = new dashBoardModel(
    dashboardTempleteModel(name, description, id_aut)
  );
  await new_dash.save();
  return new_dash;
};

module.exports = { getDashboardsByIdUser, creatNewDashboard };
