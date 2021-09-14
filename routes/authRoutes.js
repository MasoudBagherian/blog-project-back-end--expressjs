// 3rd-party modules
const express = require('express');
// custom modules
const authController = require('../controllers/authController');
const signupValidation = require('../middleware/validation/signup');
const loginValidation = require('../middleware/validation/login');
const router = express.Router();
// baseUrl ===> /auth

router.post(
  '/signup',
  [
    signupValidation.validateFirstname,
    signupValidation.validateLastname,
    signupValidation.validateUsername,
    signupValidation.validateEmail,
    signupValidation.validatePassword,
    signupValidation.validateConfirm,
  ],
  authController.handleSignup
);

router.post(
  '/login',
  loginValidation.validateLogin,
  authController.handleLogin
);

module.exports = router;
