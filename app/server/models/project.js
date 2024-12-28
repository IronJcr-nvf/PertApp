module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // المفتاح الرئيسي
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false, // مطلوب
        validate: {
          notEmpty: true, // التحقق من أن الحقل ليس فارغًا
        },
      },
      projectDescription: {
        type: DataTypes.TEXT, // وصف طويل
        allowNull: false, // مطلوب
      },
      userId: {
        type: DataTypes.INTEGER, // المفتاح الأجنبي إذا كان المشروع مرتبطًا بمستخدم
        allowNull: true, // غير مطلوب (حسب الاحتياج)
        references: {
          model: "Users", // اسم الجدول المرتبط
          key: "id", // المفتاح في جدول المستخدمين
        },
      },
    },
    {
      timestamps: true, // يضيف حقلي createdAt و updatedAt تلقائيًا
    }
  );

  return Project;
};
