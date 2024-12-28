const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const userModel = require("./user");
const projectModel = require("./project");
const taskModel = require("./task");
const dependencyModel = require("./dependency");

const User = userModel(sequelize, DataTypes);
const Project = projectModel(sequelize, DataTypes);
const Task = taskModel(sequelize, DataTypes);
const Dependency = dependencyModel(sequelize, DataTypes);

// علاقة المستخدم بالمشاريع
User.hasMany(Project, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Project.belongsTo(User, {
  foreignKey: "userId",
});

// علاقة المشاريع بالمهام
Project.hasMany(Task, {
  foreignKey: {
    name: "projectId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Task.belongsTo(Project, {
  foreignKey: "projectId",
});

// العلاقة بين المهام عبر Dependency
Task.belongsToMany(Task, {
  through: Dependency,
  as: "Dependencies",
  foreignKey: "taskId",
  otherKey: "dep_taskId",
});

// مزامنة قاعدة البيانات
sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  User,
  Project,
  Task,
  Dependency,
};
