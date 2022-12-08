import { database as dbConfigs, app as appConfigs } from "@/configs";
import mongoose from "mongoose";

// Database URL

const dbURL = `mongodb://${dbConfigs.con.host}:${dbConfigs.con.port}/${dbConfigs.con.database}`;

// Import the mongoose module
const options: mongoose.ConnectOptions = {
  autoIndex: false,
};

// Secure MongoDB with username and password
if (dbConfigs.con.username && dbConfigs.con.password) {
  options.user = dbConfigs.con.username;
  options.pass = dbConfigs.con.password;
}

async function connectDB(): Promise<mongoose.Connection> {
  try {
    // Mongoose Debug Mode [set it as `false` in production]
    mongoose.set("debug", appConfigs.mode === "development");

    await mongoose.connect(dbURL, options);
    console.log("<<<< Connected to MongoDB >>>>");

    mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library
    const db: mongoose.Connection = mongoose.connection; // Get the default connection
    return db;
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
}

export default connectDB;
