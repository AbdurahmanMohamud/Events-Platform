const db = require("../db/connection");

const findAllEvents = () => {
  return db.query(`SELECT * FROM events`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { findAllEvents };
