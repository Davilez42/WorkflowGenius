const { Schema, model, Types } = require("mongoose");

const dashboardScheme = new Schema(
  {
    id_aut: { type: Types.ObjectId, ref: "users" },
    name: { type: String, require: true },
    descripcion: { type: String, require: true },
    sesions: [
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

const dashBoardModel = model("Dashboard", dashboardScheme);
module.exports = dashBoardModel;
