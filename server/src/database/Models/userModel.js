const { Schema, model, Types } = require("mongoose");
require('dotenv').config()
const userScheme = new Schema(
  {
    first_names: { type: String, require: true },
    last_names: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    state_user: { type: Boolean, require: true, default: true },
    id_avatar: {
      type: String,
      default: process.env.URL_DEFAULT_AVATAR
    },
    dashboards: [{ type: Types.ObjectId, ref: 'Dashboard' }],
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userScheme, "users");
module.exports = userModel;
