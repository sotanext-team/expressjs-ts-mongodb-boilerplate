const { DB_SYNC = false, DB_LOGGING = false } = process.env;

export default {
  sync: DB_SYNC,
  logging: DB_LOGGING == "true" ? true : false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  con: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
};
