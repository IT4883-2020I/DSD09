import mongoose from "mongoose";
import IncidentType from "./incidentTypeModel.js";

var Schema = mongoose.Schema;

const incidentTagModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: IncidentType
    }
  },
  {
    timestamps: true
  }
);

const IncidentTag = mongoose.model("Incident_Tag", incidentTagModel);

export default IncidentTag;
