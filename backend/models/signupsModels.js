const db = require("../db/connection");

const insertSignup = ({ user_id, event_id }) => {
  if (!user_id || !event_id) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }

  return db.query(
    "INSERT INTO signups (user_id, event_id) VALUES ($1, $2) RETURNING *;",
    [user_id, event_id]
  ).then(({ rows }) => rows[0]);
};

const removeSignup = (signup_id) => {
  return db.query("DELETE FROM signups WHERE signup_id = $1 RETURNING *;", [signup_id])
    .then(({ rows }) => {
      if (!rows.length) return Promise.reject({ status: 404, msg: "Signup Not Found" });
    });
};

module.exports = { insertSignup, removeSignup };
