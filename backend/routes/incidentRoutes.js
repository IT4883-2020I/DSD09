import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  updateIncident,
  createIncident
} from "../controllers/incidentController.js";
import {
  protect,
  hasAuthorIncidents,
  checkPermissionIncidentDetail
} from "../middleware/authMiddleware.js";
import {
  validateGetIncidentsList,
  validateUpdateIncident,
  validateCreateIncident
} from "../validator/incidents.js";

router.post("/", protect, hasAuthorIncidents, validateCreateIncident(), createIncident);
router.post("/search", protect, hasAuthorIncidents, validateGetIncidentsList(), getIncidents);
router
  .route("/:id")
  .get(protect, checkPermissionIncidentDetail, getIncidentById)
  .put(protect, checkPermissionIncidentDetail, validateUpdateIncident(), updateIncident);

export default router;
