import mongoose from "mongoose";

const incidentTypeModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const IncidentType = mongoose.model("incident_types", incidentTypeModel);

export default IncidentType;
