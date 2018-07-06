const app = require("./app");
const request = require("supertest");

describe("GET requests", () => {
  test("GET / should return 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(200);
  });

  test("GET /blogposts should return an array of blogposts", async () => {
    const response = await request(app).get("/blogposts");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toEqual(true);
  });

  test("GET /users should return an array of users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body)).toEqual(true);
  });

  test("GET /blogposts/:id should return a single blogpost", async () => {
    const response = await request(app).get("/blogposts/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("body");
  });

  test("GET /blogposts/:id should return 404 if id doesn't exist", async () => {
    const response = await request(app).get("/blogposts/893123");
    expect(response.status).toEqual(404);
  });

  test("GET /users/:id should return a single user", async () => {
    const response = await request(app).get("/users/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("age");
  });

  test("GET /users/:id should return 404 if id doesn't exist", async () => {
    const response = await request(app).get("/users/78921872321");
    expect(response.status).toEqual(404);
  });
});

describe("POST requests", () => {
  test("POST /users", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        username: "test user",
        age: Math.random()
      });
    expect(response.status).toEqual(201);
  });

  test("POST /blogposts", async () => {
    const response = await request(app)
      .post("/blogposts")
      .send({
        author: "some author",
        title: "some title",
        body: "some body"
      });
    expect(response.status).toEqual(201);
  });

  test("POST /blogposts should return 400 if required fields are absent", async () => {
    const response = await request(app)
      .post("/blogposts")
      .send({
        author:
          "author is supplied, but required field of title/body) is missing"
      });
    expect(response.status).toEqual(400);
  });
});

describe("PUT requests", () => {
  test("PUT /users/:id", async () => {
    const response = await request(app)
      .put("/users/1")
      .send({
        username: "new username",
        age: 99
      });
    expect(response.status).toEqual(200);
  });

  test("PUT /blogposts/:id", async () => {
    const response = await request(app)
      .put("/blogposts/1")
      .send({
        title: "new title",
        body: "new body"
      });
    expect(response.status).toEqual(200);
  });
});

describe("DELETE requests", () => {
  test("DELETE /users/:id", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.status).toEqual(204);
  });

  test("DELETE /blogposts/:id", async () => {
    const response = await request(app).delete("/blogposts/1");
    expect(response.status).toEqual(204);
  });
});
