const server = require("./server");
const request = require("supertest");

describe("server", function() {
  describe("running", function() {
    it("should be running", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should be return a running message", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.message).toBe("server is running");
        });
    });
  });
});
