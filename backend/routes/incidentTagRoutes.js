import express from "express";
const router = express.Router();
import {
  getIncidentTags,
  createIncidentTag,
  updateIncidentTag,
  deleteIncidentTag
} from "../controllers/incidentTagController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { validateCreateIncidentTag } from "../validator/incident-tag.js";

router
  .get("/", protect, isAdmin, getIncidentTags)
  .post("/", protect, isAdmin, validateCreateIncidentTag(), createIncidentTag);
router
  .route("/:id")
  .put(protect, isAdmin, updateIncidentTag)
  .delete(protect, isAdmin, deleteIncidentTag);

export default router;
