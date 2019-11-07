import React, { useState, useEffect } from "react";
import loginService from "./services/login.js";
import blogsService from "./services/blogs.js";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    blogsService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log(user);
      console.log("login succeeded");
    } catch (exception) {
      console.log("error at login");
    }
  };

  const handleTitleChange = event => setNewTitle(event.target.value);
  const handleAuthorChange = event => setNewAuthor(event.target.value);
  const handleUrlChange = event => setNewUrl(event.target.value);

  const handleSubmit = event => {
    alert("A name was submitted: ");
    event.preventDefault();
    blogsService
      .create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
        userId: user.id
      })
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog));
        setNewAuthor("");
        setNewTitle("");
        setNewUrl("");
      });
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = user => (
    <div>
      <h2>blogs</h2>
      <h4> {user.name} logged in</h4>
      <button onClick={() => window.localStorage.clear()}>logout</button>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input value={newTitle} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            author:
            <input value={newAuthor} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={newUrl} onChange={handleUrlChange} />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogForm(user)}</div>;
};

export default App;
