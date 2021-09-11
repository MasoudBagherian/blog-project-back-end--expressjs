// 3rd-party modules
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
// custom modules
const { isPassword } = require('./utils');

module.exports.validatePassword = body('password', 'Password is not yours')
  .trim()
  .custom((value, { req }) => {
    const user = req.user;
    return bcrypt.compare(value.trim(), user.password).then((isMatch) => {
      if (!isMatch) {
        return Promise.reject('Password is not yours');
      } else {
        return true;
      }
    });
  });

module.exports.validateNewPassword = body(
  'newPassword',
  'Password should have between 8 and 20 characters and only alphabet and numeric characters and contain at least one capital letter and at least one small letter and at least one numeric character'
)
  .trim()
  .isLength({ min: 8, max: 20 })
  .custom((value) => isPassword(value));
module.exports.validateNewPasswordConfirm = body(
  'newPasswordConfirm',
  'Please confirm your new password correctly'
)
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.newPassword.trim()) {
      return false;
    }
    return true;
  });
