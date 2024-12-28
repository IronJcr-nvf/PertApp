const { Dependency } = require("../models");

const createDependency = async (req, res) => {
  try {
    const { taskId, dependencies } = req.body;
    if (!taskId || !dependencies || dependencies.length === 0) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "taskId or dependencies is Require",
      });
    }

    if (taskId == dependencies.find((id) => id === taskId)) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "A task cannot depend on itself.",
      });
    }
    const depList = dependencies.map((id) => {
      return {
        taskId,
        dep_taskId: id,
      };
    });
    console.log(depList);
    // const task = await Dependency.create({
    //   taskId,
    //   dep_taskId,
    // });
    await Dependency.destroy({
      where: {
        taskId,
      },
    });
    const tasks = await Dependency.bulkCreate(depList);
    res.status(201).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteDependency = async (req, res) => {
  try {
    const { dependencyId } = req.params;
    if (!dependencyId) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "dependencyId is Require",
      });
    }

    const deletedDep = await Dependency.destroy({
      where: {
        id: dependencyId,
      },
    });
    if (deletedDep === 0) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Dependency not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Dependency deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createDependency,
  deleteDependency,
};
