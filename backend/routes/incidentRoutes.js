import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  deleteIncidentById
} from "../controllers/incidentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", getIncidents);
router.route("/:id").get(getIncidentById).delete(deleteIncidentById);
//   .put(protect, updateUser)

export default router;
