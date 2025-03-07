const express = require("express");
const { getAllEvents, getEventById, createEvent, deleteEvent } = require("../controllers/eventsControllers");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:event_id", getEventById);
router.post("/", createEvent);
router.delete("/:event_id", deleteEvent);

module.exports = router;
