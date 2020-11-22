import asyncHandler from "express-async-handler";
import IncidentType from "../models/incidentTypeModel.js";
import { validationResult } from "express-validator";

const getIncidentTypes = asyncHandler(async (req, res) => {
  const incidentTypes = await IncidentType.find({}).exec();
  return res.json(incidentTypes);
});

const createIncidentType = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const incidentType = new IncidentType(req.body);
  let save = await incidentType.save();
  return res.json(save);
});

const updateIncidentType = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentType.findById(req.params.id).exec();
    if (req.body.name) incidentType.name = req.body.name;
    if (req.body.type) incidentType.type = req.body.type;
    await incidentType.save();
    return res.json(incidentType);
  } catch (e) {
    res.status(400).json({ message: "Incident Type not found" });
  }
});

const deleteIncidentType = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentType.findById(req.params.id).exec();
    await incidentType.remove();
    return res.json({ message: "Remove successfully" });
  } catch (e) {
    res.status(400).json({ message: "Incident Type not found" });
  }
});

export { getIncidentTypes, createIncidentType, updateIncidentType, deleteIncidentType };
