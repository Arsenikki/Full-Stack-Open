const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const mongoose = require("mongoose");
const api = supertest(app);

describe("blog controller", () => {
  it("should return correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
