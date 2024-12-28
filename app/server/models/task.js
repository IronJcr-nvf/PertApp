module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // المفتاح الرئيسي
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false, // مطلوب
    },
    description: {
      type: DataTypes.TEXT, // نص أطول
      allowNull: false, // مطلوب
    },
    duration: {
      type: DataTypes.INTEGER, // مدة المهمة (بالدقائق أو الساعات)
      allowNull: false, // مطلوب
      validate: {
        min: 1, // الحد الأدنى للمدة
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false, // مطلوب إذا كانت المهمة تابعة لمشروع
      references: {
        model: "Projects", // اسم الجدول المرتبط
        key: "id", // المفتاح في جدول المشاريع
      },
    },
  }, {
    timestamps: true, // يضيف حقلي createdAt و updatedAt تلقائيًا
  });
};
