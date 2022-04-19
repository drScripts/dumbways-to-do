const {
  dbName,
  dbPass,
  dbPort,
  dbUser,
  dbHost,
  dbDialect,
  appMode,
} = require("./");

const configProduction = {
  use_env_variable: "DATABASE_URL",
  dialect: "postgres",
  protocol: "postgres",
};

if (appMode === "production") {
  configProduction.ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}

module.exports = {
  development: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
  },
  test: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
  },
  production: configProduction,
};
