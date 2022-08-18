module.exports = {
  // Resolve the author info for a blog when requested
  author: async (blog, args, { models }) => {
    return await models.User.findById(blog.author);
  },
  // Resolved the favoritedBy info for a blog when requested
  favoritedBy: async (blog, args, { models }) => {
    return await models.User.find({ _id: { $in: blog.favoritedBy } });
  }
};
