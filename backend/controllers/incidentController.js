import asyncHandler from "express-async-handler";
import incidents from "../data/incidents.js";
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

const getIncidentById = asyncHandler(async (req, res) => {
  const incident = await Incident.findById(req.params.id)
    .populate("type")
    .populate({ path: "createdBy", select: "_id name email" })
    .populate({ path: "assignedBy", select: "_id name email" })
    .populate({ path: "assignee", select: "_id name email" })
    .exec();
  res.json(incident);
});

const deleteIncidentById = (req, res) => {
  Incident.remove({ _id: req.params.id }, (err) => {
    if (!err) {
      return res.json({ message: "Incident removed" });
    } else {
      return res.status(400).json({ message: "Incident not found" });
    }
  });
};

export { getIncidents, getIncidentById, deleteIncidentById };
