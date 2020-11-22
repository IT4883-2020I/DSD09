import express from "express";
const router = express.Router();
import { getIncidents, getIncidentById } from "../controllers/incidentController.js";
import { protect, hasAuthorIncident } from "../middleware/authMiddleware.js";
import { validateGetIncidentsList } from "../validator/incidents.js";

router.post("/", protect, hasAuthorIncident, validateGetIncidentsList(), getIncidents);
router.route("/:id").get(protect, hasAuthorIncident, getIncidentById);
//   .put(protect, updateUser)

export default router;
