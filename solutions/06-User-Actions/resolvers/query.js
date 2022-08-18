module.exports = {
  blogs: async (parent, args, { models }) => {
    return await models.Blog.find();
  },
  blog: async (parent, args, { models }) => {
    return await models.Blog.findById(args.id);
  },
  user: async (parent, args, { models }) => {
    return await models.User.findOne({ username: args.username });
  },
  users: async (parent, args, { models }) => {
    return await models.User.find({});
  },
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  }
};
