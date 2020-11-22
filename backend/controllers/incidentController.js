import asyncHandler from "express-async-handler";
import Incident from "../models/incidentModel.js";
import { validationResult } from "express-validator";
import _ from "lodash";

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

export { getIncidents, getIncidentById };
