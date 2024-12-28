module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // المفتاح الرئيسي
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // مطلوب
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false, // مطلوب
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // مطلوب
      unique: true, // يجب أن يكون فريدًا
      validate: {
        isEmail: true, // يتحقق من صحة البريد الإلكتروني
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // مطلوب
    },
  }, {
    timestamps: true, // يضيف حقلي createdAt و updatedAt تلقائيًا
  });
};
