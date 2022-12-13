export default {
  mode: process.env.NODE_ENV || "production",
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  appEnv: process.env.APP_ENV ?? "local",
};
