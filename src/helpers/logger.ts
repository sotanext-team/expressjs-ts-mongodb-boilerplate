import configs from "@/configs";
import winston, { createLogger, format, transports } from "winston";

const errorStackTracerFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

const uncolorizeOpts = {
  level: false,
  message: false,
  raw: false,
};

const logger = createLogger({
  format: winston.format.combine(
    winston.format.splat(), // Necessary to produce the 'meta' property
    errorStackTracerFormat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/application-error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/application-debug.log",
      level: "debug",
    }),
    new winston.transports.Console({
      level: configs.logger.debug ? "debug" : "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.uncolorize(uncolorizeOpts)
      ),
    }),
  ],
});

export default logger;
