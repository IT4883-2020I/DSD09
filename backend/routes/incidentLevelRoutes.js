import express from "express";
const router = express.Router();
import {
  getIncidentLevels,
  createIncidentLevel,
  updateIncidentLevel,
  deleteIncidentLevel
} from "../controllers/incidentLevelController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { validateCreateIncidentLevel } from "../validator/incident-level.js";

router
  .get("/", protect, isAdmin, getIncidentLevels)
  .post("/", protect, isAdmin, validateCreateIncidentLevel(), createIncidentLevel);
router
  .route("/:id")
  .put(protect, isAdmin, updateIncidentLevel)
  .delete(protect, isAdmin, deleteIncidentLevel);

export default router;
