import mongoose from "mongoose";

const incidentStatusModel = mongoose.Schema(
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

const IncidentStatus = mongoose.model("Incident_Status", incidentStatusModel);

export default IncidentStatus;
