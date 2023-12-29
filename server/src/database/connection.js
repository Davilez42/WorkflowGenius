const mongoose = require("mongoose")
require('dotenv').config()

const connectDb = async () => {
  console.log("⏳  WorkflowGenius: DB connecting ⏱️");
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
      console.log("✔️  WorkflowGenius: connection established");

      mongoose.connection.on("disconnected", (_) => {
        console.log("🔌 WorkflowGenius: DB disconnect ❗");
        console.log("⏳  WorkflowGenius: DB connecting ⏱️");
      });

      mongoose.connection.on("reconnected", (_) =>
        console.log("✔️  WorkflowGenius: DB reconnected ❕")
      );
      mongoose.connection.on("error", (err) =>
        console.log(
          `🌫️  WorkflowGenius: has ocurred a wrong, error:${err.message}`
        )
      );
    })
    .catch((err) => {
      console.log(
        `❌ WorkflowGenius: connection failed, URI:${config.URI_DB} , reason:${err.message}`
      );
    });
}

connectDb()

module.exports = mongoose;
