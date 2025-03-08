const db = require("../db/connection");

const fetchAllEvents = () => {
  return db.query("SELECT * FROM events;").then(({ rows }) => rows);
};

const fetchEventById = (event_id) => {
  return db.query("SELECT * FROM events WHERE event_id = $1;", [event_id])
    .then(({ rows }) => {
      if (!rows.length) return Promise.reject({ status: 404, msg: "Event Not Found" });
      return rows[0];
    });
};

const insertEvent = ({ title, description, date, location }) => {
  if (!title || !date || !location) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }
  const formattedDate = new Date(date).toISOString();
  return db.query(
    "INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *;",
    [title, description, formattedDate, location]
  ).then(({ rows }) => rows[0]);
};

const removeEvent = (event_id) => {
  return db.query("DELETE FROM events WHERE event_id = $1 RETURNING *;", [event_id])
    .then(({ rows }) => {
      if (!rows.length) return Promise.reject({ status: 404, msg: "Event Not Found" });
    });
};

module.exports = { fetchAllEvents, fetchEventById, insertEvent, removeEvent };
