const config = require("../configs/config");
const mongoose = require("mongoose");

mongoose
  .connect(config.URI_DB)
  .then(() => {
    console.log("✔️  WorkflowGenius: connection established");
    mongoose.connection.on("open", (_) =>
      console.log("🌫️ WorkflowGenius: open connection")
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

module.exports = mongoose;
