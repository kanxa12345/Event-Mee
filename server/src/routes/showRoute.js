const express = require("express");
const {
  createEvent,
  getAllEvents,
  deleteEventById,
} = require("../controllers/showController");

const router = express.Router();

router.post("/event", createEvent);
router.get("/events", getAllEvents);
router.delete("/event/:userId", deleteEventById);
module.exports = router;
