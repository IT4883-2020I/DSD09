import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  updateIncident,
  createIncident
} from "../controllers/incidentController.js";
import { protect, hasAuthorIncident } from "../middleware/authMiddleware.js";
import {
  validateGetIncidentsList,
  validateUpdateIncident,
  validateCreateIncident
} from "../validator/incidents.js";

router.post("/", protect, hasAuthorIncident, validateCreateIncident(), createIncident);
router.post("/search", protect, hasAuthorIncident, validateGetIncidentsList(), getIncidents);
router
  .route("/:id")
  .get(protect, hasAuthorIncident, getIncidentById)
  .put(protect, hasAuthorIncident, validateUpdateIncident(), updateIncident);

export default router;
