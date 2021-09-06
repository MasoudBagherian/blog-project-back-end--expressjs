const { body } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports.validateLogin = body('email', 'E-Mail or password is incorrect')
  .trim()
  .custom((value, { req }) => {
    return User.findOne({ email: value.toLowerCase() }).then((user) => {
      if (!user) {
        return Promise.reject('E-Mail or password is incorrect');
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return Promise.reject('E-Mail or password is incorrect');
          } else {
            return true;
          }
        });
    });
  });
