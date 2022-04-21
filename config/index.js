require("dotenv").config();

module.exports = {
  dbName: process.env.DATABASE_NAME,
  dbPass: process.env.DATABASE_PASS,
  dbUser: process.env.DATABASE_USER,
  dbPort: process.env.DATABASE_PORT,
  dbHost: process.env.DATABASE_HOST,
  dbDialect: process.env.DATABASE_DIALECT,
  port: process.env.PORT,
  appMode: process.env.NODE_ENV,
  jwtSecret: process.env.APP_JWT_SECRET,
  maxFileSize: process.env.APP_ALOWED_MAX_FILE_SIZE,
  appUrl: process.env.APP_BASE_URL,
  cloudName: process.env.CLOUDINARY_NAME,
  cloudApiKey: process.env.CLOUDINARY_API_KEY,
  cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
  isProduction: true,
};
