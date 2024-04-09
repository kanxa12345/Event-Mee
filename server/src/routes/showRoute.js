const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/showController");

const router = express.Router();

router.post("/event", createEvent);
router.get("/events", getAllEvents);
module.exports = router;
