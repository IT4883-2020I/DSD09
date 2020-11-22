import express from "express";
const router = express.Router();
import {
  getIncidentTypes,
  createIncidentType,
  updateIncidentType,
  deleteIncidentType
} from "../controllers/incidentTypeController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { validateCreateIncidentsList } from "../validator/incidents-types.js";

router
  .get("/", protect, isAdmin, getIncidentTypes)
  .post("/", protect, isAdmin, validateCreateIncidentsList(), createIncidentType);
router
  .route("/:id")
  .put(protect, isAdmin, updateIncidentType)
  .delete(protect, isAdmin, deleteIncidentType);

export default router;
