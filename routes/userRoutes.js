// 3rd-party modules
const express = require('express');
// custom modules
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const passwordValidation = require('../middleware/validation/changePassword');
const router = express.Router();
const profileValidation = require('../middleware/validation/profile');

// baseUrl ===> /users

router.get('/', isAuthenticated, userController.getAllUsers);
router.get('/info', isAuthenticated, userController.getLoggedInUserInfo);
router.get('/:id', isAuthenticated, userController.getUser);
router.put(
  '/change-password',
  isAuthenticated,
  [
    passwordValidation.validatePassword,
    passwordValidation.validateNewPassword,
    passwordValidation.validateNewPasswordConfirm,
  ],
  userController.changePassword
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
  userController.editUserProfile
);
router.delete('/:id', isAuthenticated, userController.deleteUser);
module.exports = router;
