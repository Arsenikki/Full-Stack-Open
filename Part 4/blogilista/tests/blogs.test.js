const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "Arska",
    author: "Matti Pollari",
    url: "blogspot.com",
    likes: 100000000000,
    id: "5dacc87607a7b44778f9cfb6"
  },
  {
    title: "Bloggeristi",
    author: "Mirva Maatula",
    url: "mirri.blogspot.com",
    likes: 1,
    id: "5dacc89607a7b44778f9cfb7"
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe("blog controller", () => {
  it("should return correct amount of blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body.length).toBe(2);
  });

  it("should contain id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.status).toBe(200);
    expect(response.body.map(blog => blog.id)).toBeDefined();
  });

  it("should add a valid person", async () => {
    let newPerson = {
      title: "Jallu123",
      author: "Jallu",
      url: "jaba.blogspot.com",
      likes: 1,
      id: "5dacc89607a7b44778f9cfb8"
    };

    let response = await api
      .post("/api/blogs")
      .send(newPerson)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toMatchObject({
      title: expect.any(String),
      author: expect.any(String),
      url: expect.any(String),
      likes: expect.any(Number),
      id: expect.any(String)
    });
  });

  it("should delete one blog", async () => {
    noteToDelete = initialBlogs[0];
    let response = await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204);

    console.log(response.body);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
