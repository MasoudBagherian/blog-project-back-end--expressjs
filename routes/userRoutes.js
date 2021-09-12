// 3rd-party modules
const express = require('express');
// custom modules
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const passwordValidation = require('../middleware/validation/changePassword');
const router = express.Router();
const profileValidation = require('../middleware/validation/profile');

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
router.put(
  '/edit-profile',
  isAuthenticated,
  [
    profileValidation.validateFirstname,
    profileValidation.validateLastname,
    profileValidation.validateUsername,
    profileValidation.validateEmail,
  ],
  userController.users_edit_profile_put
);
module.exports = router;
