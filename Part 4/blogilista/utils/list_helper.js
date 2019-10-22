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
  return bestBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
