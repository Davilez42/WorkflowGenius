const { Schema, model } = require("mongoose");

const userScheme = new Schema(
  {
    first_names: { type: String, require: true },
    last_names: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    state_user: { type: Boolean, require: true,default:true},
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

const userModel = model("User", userScheme, "users");
module.exports = userModel;
