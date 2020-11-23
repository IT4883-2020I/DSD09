import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";
import IncidentType from "../models/incidentTypeModel.js";
import IncidentStatus from "../models/incidentStatusModel.js";
import IncidentLevel from "../models/incidentLevelModel.js";
import { validationResult } from "express-validator";
import _ from "lodash";

const createIncident = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  let incident = req.body;
  incident.images = incident.images.map((image) => {
    return { url: image };
  });
  incident.videos = incident.videos.map((image) => {
    return { url: image };
  });
  let incidentTypeId = await IncidentType.findOne({ type: req.body.type }, "_id").exec();
  incident.type = incidentTypeId;

  let incidentStatusId = await IncidentStatus.findOne({ code: 0 }, "_id").exec();
  incident.status = incidentStatusId;

  const level = req.body.level || 0;
  let incidentLevelId = await IncidentLevel.findOne({ code: level }, "_id").exec();
  incident.level = incidentLevelId;
  incident.createdBy = req.user.id;

  if (req.body.dueDate) {
    incident.dueDate = new Date(req.body.dueDate);
  }

  let createIncident = new Incident(incident);
  let newIncident = await createIncident.save();
  newIncident = await findIncidentById(newIncident._id);
  return res.json(newIncident);
});

const updateIncident = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const incident = await findIncidentById(req.params.id);
  if (incident.type.type !== req.user.type) {
    res.status(404);
    throw new Error("Incident not found");
  }

  // Update
  const payload = req.body;
  if (payload.location) incident.location = payload.location;
  if (payload.name) incident.name = payload.name;
  if (payload.description) incident.description = payload.description;
  if (payload.dueDate) incident.dueDate = new Date(payload.dueDate);
  if (payload.assignee) {
    incident.assignee = payload.assignee;
    incident.assignedBy = req.user.id;
  }
  if (payload.type) {
    const incidentTypeId = await IncidentType.findOne({ type: payload.type }, "_id").exec();
    incident.type = incidentTypeId;
  }
  if (payload.status !== undefined) {
    const incidentStatusId = await IncidentStatus.findOne({ code: payload.status }, "_id").exec();
    incident.status = incidentStatusId;
  }
  if (payload.level !== undefined) {
    const incidentLevelId = await IncidentLevel.findOne({ code: payload.level }, "_id").exec();
    incident.level = incidentLevelId;
  }
  if (payload.addImageIds && payload.addImageIds.length > 0) {
    payload.addImageIds.forEach((element) => {
      incident.images.push({ url: "https://drive.google.com/uc?id=" + element });
    });
  }
  if (payload.addVideoIds && payload.addVideoIds.length > 0) {
    payload.addImageIds.forEach((element) => {
      incident.videos.push({ url: "https://drive.google.com/uc?id=" + element });
    });
  }
  if (payload.deleteImageIds && payload.deleteImageIds.length > 0) {
    incident.images = incident.images.filter((image) => {
      let imageId = image.url.split("=")[1];
      return !payload.deleteImageIds.includes(imageId);
    });
  }
  if (payload.deleteVideoIds && payload.deleteVideoIds.length > 0) {
    incident.videos = incident.videos.filter((video) => {
      let videoId = video.url.split("=")[1];
      return !payload.deleteVideoIds.includes(videoId);
    });
  }
  await incident.save();
  const newIncident = await findIncidentById(req.params.id);
  res.json(newIncident);
});

const getIncidents = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const findQuery = buildFindQuery(req.body);
  const incidents = await Incident.find(findQuery)
    .limit(req.body.limit)
    .skip(req.body.offset)
    .sort({ updatedAt: -1 })
    .populate("type")
    .populate("status")
    .populate("level")
    .exec();
  const { status, level, assignee } = req.body;
  res.json(
    incidents.filter((incident) => {
      if (level !== undefined && level !== incident.level.code) return false;
      if (status !== undefined && status !== incident.status.code) return false;
      if (assignee && assignee.length > 0 && _.difference(assignee, incident.assignee).length > 0)
        return false;
      return incident.type.type === req.user.type;
    })
  );
});

const getIncidentById = asyncHandler(async (req, res) => {
  try {
    const incident = await findIncidentById(req.params.id);
    if (incident.type.type !== req.user.type) {
      res.status(404);
      throw new Error("Incident not found");
    }
    res.json(incident);
  } catch (e) {
    res.json({ message: "Incident not found" });
  }
});

const buildFindQuery = (payload) => {
  const findQuery = {};
  if (payload.name) findQuery.name = { $regex: payload.name, $options: "i" };
  if (payload.location) findQuery.location = { $regex: payload.location, $options: "i" };
  if (payload.dueDateMin) {
    findQuery.dueDate = { $gte: new Date(payload.dueDateMin) };
  }
  if (payload.dueDateMax) {
    let dueDateMax = new Date(payload.dueDateMax);
    findQuery.dueDate = { ...findQuery.dueDate, $lt: dueDateMax.setDate(dueDateMax.getDate() + 1) };
  }
  return findQuery;
};

const findIncidentById = async (id) => {
  const incident = await Incident.findById(id)
    .populate("type")
    .populate("status")
    .populate("level")
    .exec();
  return incident;
};

export { getIncidents, getIncidentById, updateIncident, createIncident };
