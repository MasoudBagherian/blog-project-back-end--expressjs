// 3rd-party modules
const { body } = require('express-validator');

module.exports.validateComment = body(
  'comment',
  'You should type at least 5 words'
)
  .trim()
  .custom((value) => {
    if (
      value
        .replace(/\n/g, ' ')
        .split(' ')
        .filter((el) => el !== '').length < 5
    ) {
      return false;
    }
    return true;
  });
