import mongoose from "mongoose";

const incidentTypeModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const IncidentType = mongoose.model("Incident_Type", incidentTypeModel);

export default IncidentType;
