import mongoose from "mongoose";
import IncidentType from "./incidentTypeModel.js";

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
      type: Number
    },
    assignee: [
      {
        type: Number
      }
    ],
    assignedBy: {
      type: Number
    },
    dueDate: {
      type: Date
    },
    loggedTime: {
      type: Number
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: IncidentType
    },
    images: [
      {
        url: String
      }
    ],
    videos: [
      {
        url: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const IncidentModel = mongoose.model("Incident", incidentModel);

export default IncidentModel;
