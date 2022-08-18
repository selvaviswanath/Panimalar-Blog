/* Helper file for testing or local dev
/* Generates 25 fake blogs */

const faker = require('faker');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const seedBlogs = async users => {
  console.log('Seeding blogs...');
  let blogs = [];

  // generate blogs
  for (var i = 0; i < 25; i++) {
    // pick a random user from the array
    let random = [Math.floor(Math.random() * users.length)];
    let content;

    // grab content from the lorem markdownum api
    const response = await fetch(
      'https://jaspervdj.be/lorem-markdownum/markdown.txt'
    );

    // if the response is ok, use the content else generate a fake ipsum paragraph
    if (response.ok) {
      content = await response.text();
    } else {
      content = faker.lorem.paragraph();
    }

    let blog = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(users[random]._id)
    };
    blogs.push(blog);
  }
  return blogs;
};

module.exports = seedBlogs;
