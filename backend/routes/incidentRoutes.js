import express from "express";
const router = express.Router();
import { getIncidents, getIncidentById } from "../controllers/incidentController.js";
import { protect, hasAuthorIncident } from "../middleware/authMiddleware.js";

router.get("/", protect, hasAuthorIncident, getIncidents);
router.route("/:id").get(protect, hasAuthorIncident, getIncidentById);
//   .put(protect, updateUser)

export default router;
