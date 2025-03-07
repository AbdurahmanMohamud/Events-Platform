const { fetchAllEvents, fetchEventById, insertEvent, removeEvent } = require("../models/eventsModels");

const getAllEvents = (req, res, next) => {
  fetchAllEvents()
    .then((events) => res.status(200).send({ events }))
    .catch(next);
};

const getEventById = (req, res, next) => {
  fetchEventById(req.params.event_id)
    .then((event) => res.status(200).send({ event }))
    .catch(next);
};

const createEvent = (req, res, next) => {
  insertEvent(req.body)
    .then((event) => res.status(201).send({ event }))
    .catch(next);
};

const deleteEvent = (req, res, next) => {
  removeEvent(req.params.event_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = { getAllEvents, getEventById, createEvent, deleteEvent };
