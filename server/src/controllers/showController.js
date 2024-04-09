const Show = require("../models/showModel");

const createEvent = async (req, res) => {
  try {
    const existingUserEvent = await Show.findOne({ userId: req.body.userId });
    if (existingUserEvent) {
      existingUserEvent.events.push(req.body.event);
      await existingUserEvent.save();
    } else {
      await Show.create({
        userId: req.body.userId,
        events: [req.body.event],
      });
    }
    res.status(201).json({ msg: "Event added successfully!" });
  } catch (err) {
    console.log(err);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const existingUserEvent = await Show.findOne({ userId: req.query.userId });
    if (existingUserEvent) {
      const eventList = existingUserEvent.events;
      res.json(eventList);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createEvent, getAllEvents };
