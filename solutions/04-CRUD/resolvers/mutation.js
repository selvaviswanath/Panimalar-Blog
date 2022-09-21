module.exports = {
  newBlog: async (parent, args, { models }) => {
    return await models.Blog.create({
      content: args.content,
      author: 'Adam Scott'
    });
  },
  deleteBlog: async (parent, { id }, { models }) => {
    try {
      await models.Blog.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateBlog: async (parent, { content, id }, { models }) => {
    try {
      return await models.Blog.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: {
            content
          }
        },
        {
          new: true
        }
      );
    } catch (err) {
      throw new Error('Error updating blog');
    }
  }
};
