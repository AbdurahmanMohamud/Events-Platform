const db = require("../db/connection");

const fetchAllUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => rows);
};

const fetchUserById = (user_id) => {
  return db.query("SELECT * FROM users WHERE user_id = $1;", [user_id])
    .then(({ rows }) => {
      if (!rows.length) return Promise.reject({ status: 404, msg: "User Not Found" });
      return rows[0];
    });
};

const insertUser = ({ username, name, email }) => {
  if (!username || !name || !email) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }
  return db.query(
    "INSERT INTO users (username, name, email) VALUES ($1, $2, $3) RETURNING *;",
    [username, name, email]
  ).then(({ rows }) => rows[0]);
};

module.exports = { fetchAllUsers, fetchUserById, insertUser };
