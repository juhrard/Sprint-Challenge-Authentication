const request = require("supertest");

const server = require("../api/server");

describe("Auth Router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("POST Registration functionality", function() {
    it("should work properly supplied with a user object", function() {
      const user = { username: Math.random(), password: "pass" };
      
      return request(server)
        .post("/api/auth/register")
        .send(user)
        .then(res => {
          expect(res.status).toBe(201);
        })
    })
    it("should not allow duplicate users", function() {
      const user = { username: "juhrard", password: "pass" };
      
      return request(server)
        .post("/api/auth/register")
        .send(user)
        .then(res => {
          expect(res.status).toBe(500);
        })
    })
  });

  describe("POST Login functionality", function() {
    it("should work properly supplied with a user object", function() {
      const user = { username: "juhrard", password: "pass" };
      
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })
    it("should return a token response on successful login", function() {
      const user = { username: "juhrard", password: "pass" };
      
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then(res => {
          expect(res.body.token).toBeTruthy();
        })
    })
  })
})

describe("Jokes Router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET requests to /api/jokes", function() {
    it("should require a registered user to have logged in and supply a token", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(400);
        })
    })
    it("should supply array of jokes if logged in", function() {
      return request(server)
        .get("/api/jokes")
        .set({ Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Imp1aHJhcmQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU4MjkxMTUyOCwiZXhwIjoxNTgyOTE1MTI4fQ.2QYRtqo8R0_PZq2aDCbqYQGu4xgWEd4MYmEBT-_KFtQ" })
        .then(res => {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
        })
    })
  })
})