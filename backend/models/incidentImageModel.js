import mongoose from "mongoose";
var Schema = mongoose.Schema;

const incidentImageModel = mongoose.Schema(
  {
    incident_id: {
      type: Schema.Types.ObjectId,
      ref: "incidents"
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const IncidentImageModel = mongoose.model("incident_images", incidentImageModel);

export default IncidentImageModel;
