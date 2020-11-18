import mongoose from "mongoose";
var Schema = mongoose.Schema;

const incidentModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    level: {
      type: Number,
      required: true,
      default: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users"
    },
    dueDate: {
      type: Date
    },
    loggedTime: {
      type: Number
    },
    incidentTypeId: {
      type: Schema.Types.ObjectId,
      ref: "incident_types"
    }
  },
  {
    timestamps: true
  }
);

const IncidentModel = mongoose.model("incidents", incidentModel);

export default IncidentModel;
