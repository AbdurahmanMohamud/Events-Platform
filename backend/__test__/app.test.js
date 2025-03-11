const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const eventData = require("../db/data/test-data/events");
const userData = require("../db/data/test-data/users");
const signupData = require("../db/data/test-data/signups");

beforeEach(() => seed({ eventData, userData, signupData }));
afterAll(() => db.end());

describe("🔹 EVENTS ROUTES", () => {
  // GET ALL EVENTS
  describe("GET /api/events", () => {
    test("200 - Responds with an array of events", () => {
      return request(app)
        .get("/api/events")
        .expect(200)
        .then((res) => {
          const events = res.body.events;
          expect(Array.isArray(events)).toBe(true);
          expect(events.length).toBeGreaterThan(0);
          events.forEach((event) => {
            expect(event).toHaveProperty("event_id", expect.any(Number));
            expect(event).toHaveProperty("title", expect.any(String));
            expect(event).toHaveProperty("description", expect.any(String));
            expect(event).toHaveProperty("date", expect.any(String));
            expect(event).toHaveProperty("location", expect.any(String));
          });
        });
    });
  });

  // GET EVENT BY ID
  describe("GET /api/events/:event_id", () => {
    test("200 - Responds with a single event by ID", () => {
      return request(app)
        .get("/api/events/1")
        .expect(200)
        .then(({ body }) => {
          const event = body.event;
          expect(event).toHaveProperty("event_id", 1);
          expect(event).toHaveProperty("title", expect.any(String));
          expect(event).toHaveProperty("description", expect.any(String));
          expect(event).toHaveProperty("date", expect.any(String));
          expect(event).toHaveProperty("location", expect.any(String));
        });
    });

    test("404 - Responds with an error if event ID does not exist", () => {
      return request(app).get("/api/events/9999").expect(404);
    });

    test("400 - Responds with an error if event ID is invalid", () => {
      return request(app)
        .get("/api/events/notanumber")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid request");
        });
    });
  });

  // CREATE EVENT
  describe("POST /api/events", () => {
    test("201 - Creates a new event and returns it", () => {
      const newEvent = {
        title: "Tech Conference",
        description: "A gathering of tech enthusiasts.",
        date: "2025-06-15T10:00:00.000Z",
        location: "London",
      };

      return request(app)
        .post("/api/events")
        .send(newEvent)
        .expect(201)
        .then((res) => {
          const event = res.body.event;
          expect(event).toHaveProperty("event_id", expect.any(Number));
          expect(event).toHaveProperty("title", "Tech Conference");
          expect(event).toHaveProperty("description", "A gathering of tech enthusiasts.");
          expect(event).toHaveProperty("date", "2025-06-15T09:00:00.000Z");
          expect(event).toHaveProperty("location", "London");
        });
    });

    test("400 - Responds with an error if required fields are missing", () => {
      return request(app)
        .post("/api/events")
        .send({ title: "Incomplete Event" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Missing required fields");
        });
    });
  });

  // DELETE EVENT
  describe("DELETE /api/events/:event_id", () => {
    test("204 - Deletes an event by ID", () => {
      return request(app).delete("/api/events/1").expect(204);
    });

    test("404 - Responds with an error if event ID does not exist", () => {
      return request(app).delete("/api/events/9999").expect(404);
    });

    test("400 - Responds with an error if event ID is invalid", () => {
      return request(app)
        .delete("/api/events/notanumber")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid request");
        });
    });
  });
});

describe("🔹 USERS ROUTES", () => {
  // GET ALL USERS
  describe("GET /api/users", () => {
    test("200 - Responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.users)).toBe(true);
        });
    });
  });

  // GET USER BY ID
  describe("GET /api/users/:user_id", () => {
    test("200 - Responds with a single user", () => {
      return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toHaveProperty("user_id", 1);
          expect(body.user).toHaveProperty("username", expect.any(String));
          expect(body.user).toHaveProperty("email", expect.any(String));
        });
    });

    test("404 - Responds with an error if user ID does not exist", () => {
      return request(app).get("/api/users/9999").expect(404);
    });
  });

  // CREATE USER
  describe("POST /api/users", () => {
    test("201 - Creates a new user", () => {
      const newUser = {
        username: "newuser",
        name: "New User",
        email: "newuser@example.com",
      };

      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toHaveProperty("user_id", expect.any(Number));
        });
    });

    test("400 - Responds with an error if required fields are missing", () => {
      return request(app).post("/api/users").send({ username: "missingEmail" }).expect(400);
    });
  });
});

describe("🔹 SIGNUPS ROUTES", () => {
  // USER SIGNS UP FOR EVENT
  describe("POST /api/signups", () => {
    test("201 - Allows a user to sign up for an event", () => {
      return request(app)
        .post("/api/signups")
        .send({ user_id: 1, event_id: 3 })
        .expect(201)
        .then(({ body }) => {
          console.log(body)
          expect(body.signup).toHaveProperty("signup_id", expect.any(Number));
        });
    });

    test("400 - Prevents duplicate signups", () => {
      return request(app)
        .post("/api/signups")
        .send({ user_id: 3, event_id: 1 }) // First signup
        .expect(201)
        .then(() => {
          return request(app)
            .post("/api/signups")
            .send({ user_id: 3, event_id: 1 }) // Duplicate
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("User already signed up");
            });
        });
    });
  });

  // USER CANCELS SIGNUP
  describe("DELETE /api/signups/:signup_id", () => {
    test("204 - Allows a user to cancel signup", () => {
      return request(app).delete("/api/signups/1").expect(204);
    });
  });
});
