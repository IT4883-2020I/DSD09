import asyncHandler from "express-async-handler";
import axios from "axios";
import ROLE from "./roles.json";

const protect = asyncHandler(async (req, res, next) => {
  const apiToken = req.headers["api-token"] || "";
  const projectType = req.headers["project-type"] || "";

  const verify = await axios.get("https://distributed.de-lalcool.com/api/verify-token", {
    headers: {
      "api-token": apiToken,
      "project-type": projectType
    }
  });
  if (!verify || !verify.data) {
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
  if (verify.data.status === "fail") {
    return res.status(401).json(verify.data);
  }
  req.user = verify.data.result;
  next();
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === ROLE.ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

const isManager = (req, res, next) => {
  if (req.user && req.user.role === ROLE.MANAGER) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Manager");
  }
};

const isSupervisor = (req, res, next) => {
  if (req.user && req.user.role === ROLE.SUPERVISOR) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Supervisor");
  }
};

const isDroneStaff = (req, res, next) => {
  if (req.user && req.user.role === ROLE.DRONE_STAFF) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Drone Staff");
  }
};

const isIncidentStaff = (req, res, next) => {
  if (req.user && req.user.role === ROLE.INCIDENT_STAFF) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Incident Staff");
  }
};

const hasAuthorIncident = (req, res, next) => {
  const hasAccess = [ROLE.ADMIN, ROLE.INCIDENT_STAFF, ROLE.MANAGER, ROLE.SUPERVISOR];
  if (req.user && hasAccess.includes(req.user.role)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};

export {
  protect,
  isAdmin,
  isManager,
  isSupervisor,
  isIncidentStaff,
  isDroneStaff,
  hasAuthorIncident
};
