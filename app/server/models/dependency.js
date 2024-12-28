module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Dependency", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tasks", // تأكد من أن اسم الجدول مطابق تمامًا
        key: "id",
      },
    },
    dep_taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tasks", // تأكد من أن اسم الجدول مطابق تمامًا
        key: "id",
      },
    },
  });
};
