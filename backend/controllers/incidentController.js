import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";
import { validationResult } from "express-validator";

const getIncidents = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  console.log(req.body.limit);
  const incidents = await Incident.find({})
    .limit(req.body.limit)
    .skip(req.body.offset)
    .sort({ updatedAt: -1 })
    .populate("type")
    .populate("status")
    .populate("level")
    .exec();
  res.json(
    incidents
    // .filter((incident) => incident.type.type === req.user.type)
  );
});

const getIncidentById = asyncHandler(async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("type")
      .populate("status")
      .populate("level")
      .exec();
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
