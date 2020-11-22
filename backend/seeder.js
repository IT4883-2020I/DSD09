import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import incidentTypes from "./data/incident_types.js";
import IncidentTypeModel from "./models/incidentTypeModel.js";
import incidents from "./data/incidents.js";
import IncidentModel from "./models/incidentModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await IncidentTypeModel.deleteMany();
    await IncidentModel.deleteMany();

    // await IncidentTypeModel.insertMany(incidentTypes);
    await IncidentModel.insertMany(incidents);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await IncidentTypeModel.deleteMany();
    await IncidentModel.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
