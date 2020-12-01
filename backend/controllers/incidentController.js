import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";
import IncidentType from "../models/incidentTypeModel.js";
import IncidentStatus from "../models/incidentStatusModel.js";
import IncidentLevel from "../models/incidentLevelModel.js";
import IncidentTag from "../models/incidentTagModel.js";
import { validationResult } from "express-validator";
import _ from "lodash";
import axios from "axios";

const ROLE = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SUPERVISOR: "SUPERVISOR",
  DRONE_STAFF: "DRONE_STAFF",
  INCIDENT_STAFF: "INCIDENT_STAFF"
};

const createIncident = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  let incident = req.body;
  // incident.images = incident.images.map((image) => {
  //   return { url: image };
  // });
  // incident.videos = incident.videos.map((image) => {
  //   return { url: image };
  // });
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

  // Incident tags
  const tags = req.body.tags;
  if (tags && tags.length) {
    const incidentTagIds = await handleIncidentTag(tags, incidentTypeId);
    incident.tags = incidentTagIds;
  }

  let createIncident = new Incident(incident);
  let newIncident = await createIncident.save();
  newIncident = await findIncidentById(newIncident._id);
  return res.json(newIncident);
});

const handleIncidentTag = async (tags, incidentTypeId) => {
  const incidentTags = await IncidentTag.find({ type: incidentTypeId }).exec();
  let insertTags = [];
  let incidentTagIds = [];
  tags.forEach(async (tag) => {
    const existTag = _.find(incidentTags, { name: tag });
    if (!existTag) {
      insertTags.push({ name: tag, type: incidentTypeId });
    } else {
      incidentTagIds.push(existTag._id);
    }
  });
  insertTags = await IncidentTag.insertMany(insertTags);
  insertTags.forEach((insertTag) => {
    incidentTagIds.push(insertTag._id);
  });
  return incidentTagIds;
};

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
  const incidentTypeId = await IncidentType.findOne({ type: payload.type }, "_id").exec();
  if (payload.type) {
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
  if (payload.addImages && payload.addImages.length > 0) {
    payload.addImages.forEach((element) => {
      incident.images.push(element);
    });
  }
  if (payload.addVideos && payload.addVideos.length > 0) {
    payload.addVideos.forEach((element) => {
      incident.videos.push(element);
    });
  }
  if (payload.deleteImageIds && payload.deleteImageIds.length > 0) {
    incident.images = incident.images.filter((image) => !payload.deleteImageIds.includes(image.id));
  }
  if (payload.deleteVideoIds && payload.deleteVideoIds.length > 0) {
    incident.videos = incident.videos.filter((video) => !payload.deleteVideoIds.includes(video.id));
  }

  // Tag
  const tags = payload.tags;
  if (tags && tags.length) {
    const incidentTagIds = await handleIncidentTag(tags, incidentTypeId);
    console.log(incidentTagIds);
    incident.tags = incidentTagIds;
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
  let incidents = await Incident.find(findQuery)
    // .limit(req.body.limit)
    // .skip(req.body.offset)
    .sort({ updatedAt: -1 })
    .populate("type")
    .populate("status")
    .populate("level")
    .exec();

  const apiToken = req.headers["api-token"] || "";
  const projectType = req.headers["project-type"] || "";
  const assignedIncidentIds = await getAssignedIncidentIds(apiToken, projectType);
  if (!assignedIncidentIds) {
    res.status(500);
    throw new Error("Lỗi API getAssignedIncidentIds");
  }
  const { status, level } = req.body;
  incidents = incidents.filter((incident) => {
    if (level !== undefined && level !== incident.level.code) return false;
    if (status !== undefined && status !== incident.status.code) return false;
    // if (assignee && assignee.length > 0 && _.difference(assignee, incident.assignee).length > 0)
    //   return false;
    if (req.user.role === ROLE.DRONE_STAFF) return false;
    if (req.user.role === ROLE.INCIDENT_STAFF) {
      return assignedIncidentIds.includes(incident._id);
    }
    return incident.type.type === req.user.type;
  });
  const limit = req.body.limit || 20;
  const offset = req.body.offset || 0;
  let paginationIncidents = incidents.slice(offset, offset + limit);
  res.json({ incidents: paginationIncidents, total: incidents.length });
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
    res.status(404).json({ message: "Incident not found" });
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
    .populate("tags")
    .exec();
  return incident;
};

const getAssignedIncidentIds = async (apiToken, projectType) => {
  const tasks = await axios.get("https://distributed-dsd08.herokuapp.com/api/external/user-tasks", {
    headers: {
      "api-token": apiToken,
      "project-type": projectType
    }
  });
  const { current_task, pending_tasks, done_tasks } = tasks.data;
  const incidentIds = [current_task.incident_id]
    .concat(pending_tasks.map((item) => item.incident_id))
    .concat(done_tasks.map((item) => item.incident_id));
  return incidentIds;
};

export { getIncidents, getIncidentById, updateIncident, createIncident };
