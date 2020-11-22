import mongoose from "mongoose";

const incidentLevelModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const IncidentLevel = mongoose.model("Incident_Level", incidentLevelModel);

export default IncidentLevel;
