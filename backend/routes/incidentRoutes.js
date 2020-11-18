import express from "express";
const router = express.Router();
import { getIncidents } from "../controllers/incidentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/", protect, getIncidents);
// router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, getUserById)
//   .put(protect, updateUser);

export default router;
