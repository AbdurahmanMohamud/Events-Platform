const { findAllEvents } = require("../models/events.models.js");

const getAllEvents = (req, res, next) => {
  findAllEvents()
    .then((events) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const postEvent = (req, res, next) => {};

module.exports = { getAllEvents, postEvent };
