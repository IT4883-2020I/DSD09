import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";

const getIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({})
    .populate("type")
    .populate({ path: "createdBy", select: "_id name email" })
    .populate({ path: "assignedBy", select: "_id name email" })
    .populate({ path: "assignee", select: "_id name email" })
    .exec();
  res.json(incidents);
});

export { getIncidents };
