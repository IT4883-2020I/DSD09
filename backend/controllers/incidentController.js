import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";

const getIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({}).populate("type").exec();
  res.json(incidents.filter((incident) => incident.type.type === req.user.type));
});

const getIncidentById = asyncHandler(async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate("type").exec();
    if (incident.type.type !== req.user.type) {
      res.status(404);
      throw new Error("Incident not found");
    }
    res.json(incident);
  } catch (e) {
    res.json({ message: "Incident not found" });
  }
});

export { getIncidents, getIncidentById };
