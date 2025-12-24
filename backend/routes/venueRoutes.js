import express from "express";
import {
  getVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { addComment } from "../controllers/venueController.js";

const router = express.Router();

// Public
router.get("/", getVenues);
router.get("/:id", getVenueById);

// Comment (must be before admin routes to avoid conflicts)
router.post("/:id/comments", protect, addComment);

// Admin
router.post("/", protect, adminOnly, createVenue);
router.put("/:id", protect, adminOnly, updateVenue);
router.delete("/:id", protect, adminOnly, deleteVenue);

export default router;
