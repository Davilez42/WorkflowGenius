const config = require("../../configs/config");
const mongoose = require("mongoose")


const connectDb = async () => {
  console.log("⏳  WorkflowGenius: DB connecting ⏱️");
  mongoose
    .connect(config.URI_DB)
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
