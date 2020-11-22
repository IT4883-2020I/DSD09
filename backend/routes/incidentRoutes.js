import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  updateIncident
} from "../controllers/incidentController.js";
import { protect, hasAuthorIncident } from "../middleware/authMiddleware.js";
import { validateGetIncidentsList, validateUpdateIncident } from "../validator/incidents.js";

router.post("/search", protect, hasAuthorIncident, validateGetIncidentsList(), getIncidents);
router
  .route("/:id")
  .get(protect, hasAuthorIncident, getIncidentById)
  .put(protect, hasAuthorIncident, validateUpdateIncident(), updateIncident);

export default router;
