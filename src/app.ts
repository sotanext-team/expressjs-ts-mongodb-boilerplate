import Express, { Request, Response, NextFunction } from "express";
import BodyParser from "body-parser";
import cors from "cors";
import path from "path";
import winston from "winston";
import * as expressWinston from "express-winston";
import cookieParser from "cookie-parser";
//=== import internal ===
import configs from "./configs";
import * as modules from "./modules";
import express from "express";

const app: express.Application = Express();
const ExpressRouter = Express.Router();

//=== init session ===
app.use(cookieParser());

const corsConfig = configs.cors;
app.use(cors(corsConfig));

//=== Parser data request ===
app.use(BodyParser.json());
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);

//=== error handle ===
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const msg = err.message;

  if (err.name && err.name !== "server_error" && err.statusCode !== 503) {
    if (msg) {
      res.status(400).json({
        message: "error." + msg,
      });
    } else {
      res.status(500).json({
        message: "{{error.unknownError}}",
      });
    }
  } else if (
    err.name &&
    err.name === "server_error" &&
    err.statusCode === 503
  ) {
    res.status(401).json({
      success: false,
      message: "{{error.invalidCredentialError}}",
    });
  } else {
    next();
  }
});

// app.use(
//   expressWinston.logger({
//     transports: [
//       new winston.transports.Console({ level: "info" }),
//       new winston.transports.File({
//         level: "info",
//         filename: "./logs/access.log",
//         maxsize: 10 * 1000000,
//         maxFiles: 0,
//         tailable: true,
//       }),
//       new winston.transports.File({
//         level: "error",
//         filename: "./logs/error.log",
//         maxsize: 10 * 1000000,
//         maxFiles: 0,
//         tailable: true,
//       }),
//     ],
//     meta: false,
//     msg: "HTTP {{req.method}} {{req.url}}",
//     expressFormat: true,
//     colorize: true,
//     ignoreRoute: function (req, res) {
//       return false;
//     },
//   })
// );

//=== Init router ===
for (const key in modules) {
  if ((modules as any)[key]) {
    const { controllers } = (modules as any)[key];

    if (controllers) {
      for (const controllerName in controllers) {
        if (controllers[controllerName]) {
          app.use(
            "/api/v1",
            ExpressRouter.use(`/${controllerName}`, controllers[controllerName])
          );
        }
      }
    }
  }
}

app.get("/", function (req, res) {
  res.json({
    message: "Hello world!",
  });
});

export default app;
