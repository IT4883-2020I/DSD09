import express from "express";
const router = express.Router();
import {
  getIncidentStatuses,
  createIncidentStatus,
  updateIncidentStatus,
  deleteIncidentStatus
} from "../controllers/incidentStatusController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { validateCreateIncidentStatus } from "../validator/incident-status.js";

router
  .get("/", protect, getIncidentStatuses)
  .post("/", protect, isAdmin, validateCreateIncidentStatus(), createIncidentStatus);
router
  .route("/:id")
  .put(protect, isAdmin, updateIncidentStatus)
  .delete(protect, isAdmin, deleteIncidentStatus);

export default router;
