const { Task, Project, Dependency } = require("../models");
const createTask = async (req, res) => {
  try {
    const { taskName, description, duration, projectId } = req.body;
    if (!taskName || !description || !duration || !projectId) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "all input is require",
      });
    }
    const existingProject = await Project.findAll({
      where: { id: projectId },
    });
    if (!existingProject) {
      return res.status(404).json({
        status: "fail",
        message: "project not found",
        data: null,
      });
    }

    const newTask = await Task.create({
      taskName,
      description,
      duration,
      projectId,
    });
    res.status(201).json({
      status: "success",
      message: "task created",
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "projectId is require",
      });
    }
    const tasks = await Task.findAll({
      where: { projectId },
    });

    const tasksWithDependencies = await Promise.all(
      tasks.map(async (task) => {
        const dependencies = await Dependency.findAll({
          where: { taskId: task.id },
        });

        const detailedDependencies = await Promise.all(
          dependencies.map(async (dependency) => {
            const dependentTask = await Task.findOne({
              where: { id: dependency.dep_taskId },
              attributes: ["taskName"],
            });

            return {
              ...dependency.toJSON(),
              dep_taskName: dependentTask ? dependentTask.taskName : null,
            };
          })
        );

        return {
          ...task.toJSON(),
          dependencies: detailedDependencies,
        };
      })
    );
    res.status(200).json({
      status: "success",
      data: tasksWithDependencies,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getTaskDetails = async (req, res) => {
  try {
    const { taskId } = req.params;
    const taskDetails = await Task.findOne({
      where: {
        id: taskId,
      },
    });

    if (!taskDetails) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: taskDetails,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(404).json({
        status: "fail",
        message: "taskId is require",
        data: null,
      });
    }
    const existingTask = await Task.findOne({
      where: {
        id: taskId,
      },
    });
    if (!existingTask) {
      return res.status(404).json({
        status: "fail",
        message: "task not found",
        data: null,
      });
    }

    const updatedTask = await existingTask.update(req.body);
    res.status(200).json({
      status: "success",
      date: updatedTask,
      message: "task updated",
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(404).json({
        status: "fail",
        message: "taskId is require",
        data: null,
      });
    }
    const deletedTask = await Task.destroy({
      where: {
        id: taskId,
      },
    });
    if (deletedTask > 0) {
      res.status(200).json({
        status: "success",
        message: "Task has been deleted.",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskDetails,
  updateTask,
  deleteTask,
};
