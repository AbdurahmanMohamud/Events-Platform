const format = require('pg-format');
const db = require('../connection');

const seed = ({ userData, eventData, signupData }) => {
  return db
    .query(`DROP TABLE IF EXISTS signups;`)
    .then(() => db.query(`DROP TABLE IF EXISTS events;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))
    .then(() => {
      const usersTablePromise = db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR UNIQUE NOT NULL,
          name VARCHAR NOT NULL,
          email VARCHAR UNIQUE NOT NULL
        );`);

      return usersTablePromise;
    })
    .then(() => {
      return db.query(`
        CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          description TEXT,
          date TIMESTAMP NOT NULL,
          location VARCHAR NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE signups (
          signup_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
          event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
          UNIQUE(user_id, event_id)
        );`);
    })
    .then(() => {
      const insertUsersQuery = format(
        'INSERT INTO users (username, name, email) VALUES %L RETURNING *;',
        userData.map(({ username, name, email }) => [username, name, email])
      );

      return db.query(insertUsersQuery);
    })
    .then(() => {
      const insertEventsQuery = format(
        'INSERT INTO events (title, description, date, location) VALUES %L RETURNING *;',
        eventData.map(({ title, description, date, location }) => [
          title,
          description,
          date,
          location,
        ])
      );

      return db.query(insertEventsQuery);
    })
    .then(({ rows: eventRows }) => {
      const insertSignupsQuery = format(
        'INSERT INTO signups (user_id, event_id) VALUES %L;',
        signupData.map(({ user_id, event_id }) => [user_id, event_id])
      );

      return db.query(insertSignupsQuery);
    });
};

module.exports = seed;
