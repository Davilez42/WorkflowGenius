const { ObjectId } = require("mongodb");

function dashboardTempleteModel(dashboard) {
  return {
    ...dashboard,
    sesions: [
      {
        _id: new ObjectId(),
        name: "todo",
        tasks: [
          {
            _id: new ObjectId(),
            title: "Welcome to ad tasker",
            description: "welcome!!!",
          },
        ],
      },
      {
        _id: new ObjectId(),
        name: "inprogress",
        tasks: [
          {
            _id: new ObjectId(),
            title: "tasks in progress...",
            description: "progress",
          },
        ],
      },
      {
        _id: new ObjectId(),
        name: "terminate",
        tasks: [
          {
            _id: new ObjectId(),
            title: "tasks terminated...",
            description: "terminated",
          },
        ],
      },
    ],
  };
}

module.exports = {
  dashboardTempleteModel,
};
