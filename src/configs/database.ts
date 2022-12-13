const { DB_SYNC = false, DB_LOGGING = false } = process.env;

export default {
  sync: DB_SYNC == "true" ? true : false,
  logging: DB_LOGGING == "true" ? true : false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  con: {
    username: process.env.DB_USER ?? "root",
    password: process.env.DB_PASS ?? "root",
    database: process.env.DB_NAME ?? "monsterra-chat",
    host: process.env.DB_HOST ?? "0.0.0.0",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017,
  },
};
