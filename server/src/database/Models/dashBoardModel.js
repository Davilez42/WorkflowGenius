const { ObjectId } = require("mongodb");
const { Schema, model, Types } = require("mongoose");

const dashboardScheme = new Schema(
  {
    id_aut: { type: Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
    description: { type: String, require: true },
    sessions: [
      {
        _id: { type: Types.ObjectId },
        name: { type: String, require: true },
        tasks: [
          {
            _id: { type: Types.ObjectId },
            title: { type: String, require: true },
            description: { type: String, require: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const dashBoardModel = model("Dashboard", dashboardScheme, "dashboards");
module.exports = dashBoardModel;
