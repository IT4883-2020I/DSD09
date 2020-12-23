import express from "express";
const router = express.Router();
import {
  getIncidentTypes,
  createIncidentType,
  updateIncidentType,
  deleteIncidentType
} from "../controllers/incidentTypeController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { validateCreateIncidentType } from "../validator/incidents-types.js";

router
  .get("/", protect, getIncidentTypes)
  .post("/", protect, isAdmin, validateCreateIncidentType(), createIncidentType);
router
  .route("/:id")
  .put(protect, isAdmin, updateIncidentType)
  .delete(protect, isAdmin, deleteIncidentType);

export default router;
