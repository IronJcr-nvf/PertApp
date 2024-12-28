const { Sequelize } = require("sequelize");

// استخدام المتغيرات البيئية بشكل صحيح
const sequelize = new Sequelize(
  process.env.DB_NAME, // اسم قاعدة البيانات
  process.env.DB_USER, // اسم المستخدم
  process.env.DB_PASSWORD, // كلمة المرور
  {
    host: process.env.DB_HOST || "localhost", // عنوان الخادم
    dialect: process.env.DIALECT || "postgres", // نوع قاعدة البيانات
    port: process.env.DB_PORT || 1027, // المنفذ
    logging: false,  
  }
);

// اختبار الاتصال بقاعدة البيانات
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Successfully connected to the database.");
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error.message);
  });

module.exports = sequelize;
