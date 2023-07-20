const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs[0];
};

const mostBlogs = (blogs) => {
  const countedBlogs = blogs.reduce((value, { author }) => {
    if (!value[author]) {
      value[author] = 0;
    }
    value[author]++;
    return value;
  }, {});

  return Object.entries(countedBlogs).reduce(
    (acc, [key, value]) => {
      return value > acc.blogs ? { author: key, blogs: value } : acc;
    },
    { author: undefined, blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  const authorsByLikes = blogs.reduce((value, { author, likes }) => {
    if (!value[author]) {
      value[author] = 0;
    }
    value[author] += likes;
    return value;
  }, {});

  return Object.entries(authorsByLikes).reduce(
    (acc, [key, value]) => {
      return value > acc.likes ? { author: key, likes: value } : acc;
    },
    { author: undefined, likes: 0 }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
