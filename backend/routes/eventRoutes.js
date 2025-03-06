const express = require("express");
const { getAllEvents, postEvent } = require("../controllers/eventsControllers.js");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", postEvent);

module.exports = router;
