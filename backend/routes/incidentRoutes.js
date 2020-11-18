import express from "express";
const router = express.Router();
import {
  getIncidents,
  getIncidentById,
  deleteIncidentById
} from "../controllers/incidentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", protect, getIncidents);
router.route("/:id").get(protect, getIncidentById).delete(protect, deleteIncidentById);
//   .put(protect, updateUser)

export default router;
