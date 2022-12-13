import app from "./app";
import cors from "./cors";
import database from "./database";
import logger from "./logger";
import paginator from "./paginator";
import redis from "./redis";
import jwt from "./jwt";
import { IConfigModel } from "./types";

const configs: IConfigModel = {
  app,
  cors,
  database,
  logger,
  paginator,
  redis,
  jwt,
};

export default configs;
