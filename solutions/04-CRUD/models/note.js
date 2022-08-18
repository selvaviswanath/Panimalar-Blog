// Require the mongose library
const mongoose = require('mongoose');

// Define the blog's database schema
const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

// Define the 'Blog' model with the schema
const Blog = mongoose.model('Blog', blogSchema);
// Export the module
module.exports = Blog;
