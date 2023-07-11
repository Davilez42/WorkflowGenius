const { Schema, model } = require("mongoose");

const userScheme = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    state_user: { type: Boolean, require: true },
    recent_sesion: { type: Date, require: true },
    id_avatar: {
      type: String,
      default:
        "https://ik.imagekit.io/picmont/icons/default_avatar.png?updatedAt=1687206611943",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("users", userScheme);
module.exports = userModel;
