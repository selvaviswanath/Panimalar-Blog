/* Take in an email and generate a Gravatar url */
/* https://gravatar.com/site/implement/ */
const { sha512 } = require('sha512/lib/sha512');

const gravatar = email => {
  const hash = sha512(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;
