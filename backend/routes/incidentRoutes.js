import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  deleteIncidentById
} from "../controllers/incidentController.js";
import { protect, hasAuthorIncident } from "../middleware/authMiddleware.js";

router.get("/", protect, hasAuthorIncident, getIncidents);
router.route("/:id").get(protect, hasAuthorIncident, getIncidentById).delete(deleteIncidentById);
//   .put(protect, updateUser)

export default router;
