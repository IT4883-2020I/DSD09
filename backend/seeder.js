import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import incidentTypes from "./data/incident_types.js";
import IncidentTypeModel from "./models/incidentTypeModel.js";
import incidentLevel from "./data/incident_level.js";
import IncidentLevelModel from "./models/incidentLevelModel.js";
import incidentStatus from "./data/incident_status.js";
import IncidentStatusModel from "./models/incidentStatusModel.js";
import incidents from "./data/incidents.js";
import IncidentModel from "./models/incidentModel.js";
import connectDB from "./config/db.js";
import incidentLevels from "./data/incident_level.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await IncidentModel.deleteMany();
    await IncidentModel.insertMany(incidents);

    // await IncidentTypeModel.deleteMany();
    // await IncidentTypeModel.insertMany(incidentTypes);

    // await IncidentStatusModel.deleteMany();
    // await IncidentStatusModel.insertMany(incidentStatus);

    // await IncidentLevelModel.deleteMany();
    // await IncidentLevelModel.insertMany(incidentLevels);

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
