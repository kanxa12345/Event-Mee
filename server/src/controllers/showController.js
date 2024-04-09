const Show = require("../models/showModel");

const createEvent = async (req, res) => {
  try {
    const existingEvent = await Show.findOne({ showName: req.body.showName });
    if (existingEvent) {
      return res.status(403).json({ msg: "Event already exists." });
    } else {
      await Show.create(req.body);
      res.status(201).json({ msg: "Event added successfully!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to add event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Show.find();
    res.json(events);
  } catch (err) {
    res.status(400).json({ msg: "Failed to fetch events" });
  }
};

module.exports = { createEvent, getAllEvents };
