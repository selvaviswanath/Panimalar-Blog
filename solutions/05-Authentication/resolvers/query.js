module.exports = {
  blogs: async (parent, args, { models }) => {
    return await models.Blog.find();
  },
  blog: async (parent, args, { models }) => {
    return await models.Blog.findById(args.id);
  }
};
