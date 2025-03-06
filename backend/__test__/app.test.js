const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const eventData = require("../db/data/test-data/events");
const userData = require("../db/data/test-data/users");
const signupData = require("../db/data/test-data/signups");

beforeEach(() => seed({ eventData, userData, signupData }));
afterAll(() => db.end());

describe("Invalid Endpoint", () => {
  test("GET: 404 - Responds with a 404 error for an invalid endpoint", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
});

describe("GET: /api/events", () => {
  test("GET: 200 - Responds with an array of events with required properties", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(Array.isArray(events)).toBe(true);
        expect(events.length).toBeGreaterThan(0);
        events.forEach((event) => {
          expect(event).toHaveProperty("event_id", expect.any(Number));
          expect(event).toHaveProperty("name", expect.any(String));
          expect(event).toHaveProperty("date", expect.any(String));
          expect(event).toHaveProperty("location", expect.any(String));
          expect(event).toHaveProperty("capacity", expect.any(Number));
        });
      });
  });
});

describe("GET: /api/events/:event_id", () => {
  test("GET: 200 - Responds with a single event by ID", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then(({ body }) => {
        const event = body.event;
        expect(event).toHaveProperty("event_id", 1);
        expect(event).toHaveProperty("name", expect.any(String));
        expect(event).toHaveProperty("date", expect.any(String));
        expect(event).toHaveProperty("location", expect.any(String));
        expect(event).toHaveProperty("capacity", expect.any(Number));
      });
  });

  test("GET: 404 - Responds with an error if event ID does not exist", () => {
    return request(app).get("/api/events/9999").expect(404);
  });

  test("GET: 400 - Responds with an error if event ID is invalid", () => {
    return request(app)
      .get("/api/events/notanumber")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid request");
      });
  });
});

describe("POST: /api/events", () => {
  test("POST: 201 - Creates a new event and returns it", () => {
    const newEvent = {
      name: "Tech Conference",
      date: "2025-06-15",
      location: "London",
      capacity: 300,
    };

    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(201)
      .then(({ body }) => {
        const event = body.event;
        expect(event).toHaveProperty("event_id", expect.any(Number));
        expect(event).toHaveProperty("name", "Tech Conference");
        expect(event).toHaveProperty("date", "2025-06-15");
        expect(event).toHaveProperty("location", "London");
        expect(event).toHaveProperty("capacity", 300);
      });
  });

  test("POST: 400 - Responds with an error if required fields are missing", () => {
    const incompleteEvent = {
      name: "Missing Data",
    };

    return request(app)
      .post("/api/events")
      .send(incompleteEvent)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Missing required fields");
      });
  });
});

describe("PATCH: /api/events/:event_id", () => {
  test("PATCH: 200 - Updates an event's details", () => {
    const updateData = { name: "Updated Event" };

    return request(app)
      .patch("/api/events/1")
      .send(updateData)
      .expect(200)
      .then(({ body }) => {
        const event = body.event;
        expect(event).toHaveProperty("event_id", 1);
        expect(event).toHaveProperty("name", "Updated Event");
      });
  });

  test("PATCH: 404 - Responds with an error if event ID does not exist", () => {
    return request(app)
      .patch("/api/events/9999")
      .send({ name: "New Name" })
      .expect(404);
  });

  test("PATCH: 400 - Responds with an error if event ID is invalid", () => {
    return request(app)
      .patch("/api/events/notanumber")
      .send({ name: "New Name" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid request");
      });
  });
});

describe("DELETE: /api/events/:event_id", () => {
  test("DELETE: 204 - Deletes an event by ID", () => {
    return request(app).delete("/api/events/1").expect(204);
  });

  test("DELETE: 404 - Responds with an error if event ID does not exist", () => {
    return request(app).delete("/api/events/9999").expect(404);
  });

  test("DELETE: 400 - Responds with an error if event ID is invalid", () => {
    return request(app)
      .delete("/api/events/notanumber")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid request");
      });
  });
});
