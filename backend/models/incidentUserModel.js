import mongoose from "mongoose";
var Schema = mongoose.Schema;

const incidentUserModel = mongoose.Schema({
  incident_id: {
    type: Schema.Types.ObjectId,
    ref: "incidents"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
});

const IncidentUser = mongoose.model("incident_users", incidentUserModel);

export default IncidentUser;
