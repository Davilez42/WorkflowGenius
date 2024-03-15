const { ObjectId } = require("mongodb");

function dashboardTemplateModel(dashboard) {
  return {
    ...dashboard,
    sections: [
      {
        name: "todo",
        tasks: [
          {
            title: "Welcome to ad tasker",
            description: "welcome!!!",
          },
        ],
      },
      {
        name: "inprogress",
        tasks: [
          {
            title: "tasks in progress...",
            description: "progress",
          },
        ],
      },
      {
        name: "terminate",
        tasks: [
          {
            title: "tasks terminated...",
            description: "terminated",
          },
        ],
      },
    ],
  };
}

module.exports = {
  dashboardTemplateModel,
};
