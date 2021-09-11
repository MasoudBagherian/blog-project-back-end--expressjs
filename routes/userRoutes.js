// 3rd-party modules
const express = require('express');
// custom modules
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const passwordValidation = require('../middleware/validation/changePassword');
const router = express.Router();

// baseUrl ===> /users
router.get('/info', isAuthenticated, userController.users_info_get);
router.put(
  '/change-password',
  isAuthenticated,
  [
    passwordValidation.validatePassword,
    passwordValidation.validateNewPassword,
    passwordValidation.validateNewPasswordConfirm,
  ],
  userController.users_change_password_put
);
module.exports = router;
