const { body } = require('express-validator');
const { isName, isEmail, isPassword } = require('./utils');
const User = require('../../models/User');

module.exports.validateFirstname = body(
  'firstname',
  'First name should have at least 2 characters and contains only space and alphabet characters'
)
  .trim()
  .isLength({ min: 2 })
  .custom((value) => isName(value));

module.exports.validateLastname = body(
  'lastname',
  'Last name should have at least 2 characters and contains only space and alphabet characters'
)
  .trim()
  .isLength({ min: 2 })
  .custom((value) => isName(value));

module.exports.validateUsername = body(
  'username',
  'Username should have between 8 and 20 characters'
)
  .trim()
  .isLength({ min: 8, max: 20 });

module.exports.validateEmail = body('email', 'Please enter a valid E-Mail')
  .trim()
  .custom((value) => {
    if (!isEmail(value)) {
      return false;
    }
    return User.findOne({ email: value.toLowerCase() }).then((user) => {
      if (user) {
        return Promise.reject(
          'E-Mail belongs to another user. Please type another E-Mail'
        );
      } else {
        return true;
      }
    });
  });
module.exports.validatePassword = body(
  'password',
  'Password should have between 8 and 20 characters and only alphabet and numeric characters and contain at least one capital letter and at least one small letter and at least one numeric character'
)
  .trim()
  .isLength({ min: 8, max: 20 })
  .custom((value) => isPassword(value));
module.exports.validateConfirm = body(
  'passwordConfirm',
  'Please confirm your password correctly'
)
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.password.trim()) {
      return false;
    }
    return true;
  });
