import http from "http";
//=== import internal ===
import app from "@/app";
import { app as appConfig, database } from "@/configs";
import logger from "@/helpers/logger";
import dbConnect from "@/database";

const port = appConfig.port;

class Server {
  async start() {
    await dbConnect();
    this.run();
  }

  run() {
    this.http();

    logger.info(`Worker ${process.pid} started`);
  }

  http() {
    //=== HTTP Server ===
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
      logger.info(
        "Express server listening on http://localhost:" +
          httpServer.address()?.toString()
      );
    });
    httpServer.on("error", this.onError);
    httpServer.on("listening", () => {
      logger.info("Listening on port: " + httpServer.address()?.toString());
    });
  }

  onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    //=== handle specific listen errors with friendly messages ===
    switch (error.code) {
      case "EACCES":
        logger.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

new Server().start();
