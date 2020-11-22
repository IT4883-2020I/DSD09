import asyncHandler from "express-async-handler";
import IncidentStatus from "../models/incidentStatusModel.js";
import { validationResult } from "express-validator";

const getIncidentStatuses = asyncHandler(async (req, res) => {
  const incidentTypes = await IncidentStatus.find({}).exec();
  return res.json(incidentTypes);
});

const createIncidentStatus = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const incidentTypes = await IncidentStatus.find({}).sort({ code: -1 }).exec();
  const incidentType = new IncidentStatus({ name: req.body.name, code: incidentTypes[0].code + 1 });
  let save = await incidentType.save();
  return res.json(save);
});

const updateIncidentStatus = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentStatus.findById(req.params.id).exec();
    if (req.body.name) incidentType.name = req.body.name;
    await incidentType.save();
    return res.json(incidentType);
  } catch (e) {
    res.status(400).json({ message: "Incident Status not found" });
  }
});

const deleteIncidentStatus = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentStatus.findById(req.params.id).exec();
    await incidentType.remove();
    return res.json({ message: "Remove successfully" });
  } catch (e) {
    res.status(400).json({ message: "Incident Status not found" });
  }
});

export { getIncidentStatuses, createIncidentStatus, updateIncidentStatus, deleteIncidentStatus };
