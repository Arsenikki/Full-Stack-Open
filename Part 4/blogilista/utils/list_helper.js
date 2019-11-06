const _ = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  let sum = 0;
  blogs.forEach(blog => {
    sum += blog.likes;
  });
  console.log(sum);
  return sum;
};

const favouriteBlog = blogs => {
  let bestBlog;
  let currentLikes = 0;
  blogs.forEach(blog => {
    if (blog.likes >= currentLikes) {
      bestBlog = blog;
      currentLikes = blog.likes;
    }
  });
  return bestBlog.title;
};

const mostBlogs = blogs => {
  let authorWithMostBlogs;
  let mostBlogsCount = 0;
  var obj = _.countBy(blogs, "author");
  mostBlogsCount = _.max(_.values(obj));
  authorWithMostBlogs = _.findKey(obj, value => value === mostBlogsCount);
  return {
    author: authorWithMostBlogs,
    blogs: mostBlogsCount
  };
};

const mostLikes = blogs => {
  let authorWithMostLikes;
  let mostLikeCount = 0;

  var objii = _.countBy(blogs, "author");
  authors = _.keys(objii);

  authors.map(author => {
    let totalLikesOfAuthor = _.sumBy(_.filter(blogs, { author }), "likes");
    if (totalLikesOfAuthor > mostLikeCount) {
      mostLikeCount = totalLikesOfAuthor;
      authorWithMostLikes = author;
    }
  });

  return {
    author: authorWithMostLikes,
    likes: mostLikeCount
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
