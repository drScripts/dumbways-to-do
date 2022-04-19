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
};
