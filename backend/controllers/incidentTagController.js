import asyncHandler from "express-async-handler";
import IncidentTag from "../models/incidentTagModel.js";
import { validationResult } from "express-validator";
import IncidentType from "../models/incidentTypeModel.js";

const getIncidentTags = asyncHandler(async (req, res) => {
  const incidentTypes = await IncidentType.find({ type: req.user.type }).exec();
  const incidentTags = await IncidentTag.find({ type: incidentTypes[0]._id })
    .populate("type")
    .exec();
  return res.json(incidentTags);
});

const createIncidentTag = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const incidentType = await IncidentType.find({ type: req.body.type }).exec();
  const incidentTags = await IncidentTag.find({
    name: req.body.name,
    type: incidentType[0]._id
  }).exec();
  if (incidentTags.length > 0) {
    return res.status(400).json({ message: "Tag name is exists" });
  }
  const incidentTag = new IncidentTag({ name: req.body.name, type: incidentType[0]._id });
  await incidentTag.save();
  const saved = await IncidentTag.find({
    name: req.body.name,
    type: incidentType[0]._id
  })
    .populate("type")
    .exec();
  return res.json(saved);
});

const updateIncidentTag = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentTag.findById(req.params.id).exec();
    if (req.body.name) incidentType.name = req.body.name;
    await incidentType.save();
    const saved = await IncidentTag.findById(req.params.id).populate("type").exec();
    return res.json(saved);
  } catch (e) {
    res.status(400).json({ message: "Incident Tag not found" });
  }
});

const deleteIncidentTag = asyncHandler(async (req, res) => {
  try {
    const incidentType = await IncidentTag.findById(req.params.id).exec();
    await incidentType.remove();
    return res.json({ message: "Remove successfully" });
  } catch (e) {
    res.status(400).json({ message: "Incident Tag not found" });
  }
});

export { getIncidentTags, createIncidentTag, updateIncidentTag, deleteIncidentTag };
