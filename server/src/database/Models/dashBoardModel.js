const { ObjectId } = require("mongodb");
const { Schema, model, Types } = require("mongoose");

const dashboardScheme = new Schema(
  {
    id_aut: { type: Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
    description: { type: String, require: true },
    members: [{
      user: { type: Types.ObjectId, ref: 'User' },
      role: { type: String, require: true, }
    }],
    sections: [
      {
        name: { type: String, require: true },
        tasks: [
          {
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
