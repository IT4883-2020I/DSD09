import asyncHandler from "express-async-handler";
import axios from "axios";

const ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SUPERVISOR: "SUPERVISOR",
  DRONE_STAFF: "DRONE_STAFF",
  INCIDENT_STAFF: "INCIDENT_STAFF"
};

const protect = asyncHandler(async (req, res, next) => {
  const apiToken = req.headers["api-token"] || "";
  const projectType = req.headers["project-type"] || "";
  try {
    const verify = await axios.get("https://distributed.de-lalcool.com/api/verify-token", {
      headers: {
        "api-token": apiToken,
        "project-type": projectType
      }
    });
    req.user = verify.data.result;
    next();
  } catch (e) {
    const { status, data } = e.response;
    return res.status(status).json(data);
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === ROLE.ADMIN) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const isManager = (req, res, next) => {
  if (req.user && req.user.role === ROLE.MANAGER) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const isSupervisor = (req, res, next) => {
  if (req.user && req.user.role === ROLE.SUPERVISOR) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const isDroneStaff = (req, res, next) => {
  if (req.user && req.user.role === ROLE.DRONE_STAFF) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const isIncidentStaff = (req, res, next) => {
  if (req.user && req.user.role === ROLE.INCIDENT_STAFF) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const hasAuthorIncidents = (req, res, next) => {
  const hasAccess = [
    ROLE.ADMIN,
    ROLE.MANAGER,
    ROLE.SUPERVISOR,
    ROLE.INCIDENT_STAFF,
    ROLE.SUPER_ADMIN
  ];
  if (req.user && hasAccess.includes(req.user.role)) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

const checkPermissionIncidentDetail = async (req, res, next) => {
  const roleUser = req.user.role;
  if (roleUser === ROLE.ADMIN || ROLE.MANAGER || ROLE.SUPERVISOR) {
    next();
  } else if (roleUser === ROLE.INCIDENT_STAFF) {
    const apiToken = req.headers["api-token"] || "";
    const projectType = req.headers["project-type"] || "";
    const tasks = await axios.get(
      "https://distributed-dsd08.herokuapp.com/api/external/user-tasks",
      {
        headers: {
          "api-token": apiToken,
          "project-type": projectType
        }
      }
    );
    const { current_task, pending_tasks, done_tasks } = tasks.data;
    const incidentIds = [current_task.incident_id]
      .concat(pending_tasks.map((item) => item.incident_id))
      .concat(done_tasks.map((item) => item.incident_id));
    if (incidentIds.includes(req.params.id)) {
      next();
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

export {
  protect,
  isAdmin,
  isManager,
  isSupervisor,
  isIncidentStaff,
  isDroneStaff,
  hasAuthorIncidents,
  checkPermissionIncidentDetail
};
