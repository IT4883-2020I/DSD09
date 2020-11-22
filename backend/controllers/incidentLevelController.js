import asyncHandler from "express-async-handler";
import IncidentLevel from "../models/incidentLevelModel.js";
import { validationResult } from "express-validator";

const getIncidentLevels = asyncHandler(async (req, res) => {
  const incidentTypes = await IncidentLevel.find({}).exec();
  return res.json(incidentTypes);
});

const createIncidentLevel = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const incidentTypes = await IncidentLevel.find({}).sort({ code: -1 }).exec();
  const incidentType = new IncidentLevel({ name: req.body.name, code: incidentTypes[0].code + 1 });
  let save = await incidentType.save();
  return res.json(save);
});

const updateIncidentLevel = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentLevel.findById(req.params.id).exec();
    if (req.body.name) incidentType.name = req.body.name;
    await incidentType.save();
    return res.json(incidentType);
  } catch (e) {
    res.status(400).json({ message: "Incident Level not found" });
  }
});

const deleteIncidentLevel = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentLevel.findById(req.params.id).exec();
    await incidentType.remove();
    return res.json({ message: "Remove successfully" });
  } catch (e) {
    res.status(400).json({ message: "Incident Level not found" });
  }
});

export { getIncidentLevels, createIncidentLevel, updateIncidentLevel, deleteIncidentLevel };
