const { body } = require('express-validator');
const { minWords } = require('./utils');
module.exports.validateTitle = body(
  'title',
  'Title should have at least 5 characters'
)
  .trim()
  .isLength({ min: 5 });

module.exports.validateContent = body(
  'content',
  'Your arcticle should has at least 30 words'
).custom((value) => {
  return minWords(value, 30);
});
