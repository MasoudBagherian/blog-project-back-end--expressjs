const { body } = require('express-validator');
const { isEmail } = require('./utils');
const User = require('../../models/User');

const signupValidation = require('./signup');

module.exports.validateFirstname = signupValidation.validateFirstname;
module.exports.validateLastname = signupValidation.validateLastname;
module.exports.validateUsername = signupValidation.validateUsername;
module.exports.validateEmail = body('email', 'Please enter a valid E-Mail')
  .trim()
  .custom((value, { req }) => {
    const user = req.user;
    if (!isEmail(value)) {
      return false;
    }
    return User.findOne({ email: value.toLowerCase() }).then((foundUser) => {
      if (foundUser) {
        if (user._id.toString() !== foundUser._id.toString()) {
          return Promise.reject(
            'E-Mail belongs to another user. Please type another E-Mail'
          );
        }
      }
    });
  });
