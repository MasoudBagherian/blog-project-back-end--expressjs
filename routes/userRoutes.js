// 3rd-party modules
const express = require('express');
// custom modules
const userController = require('../controllers/userController');

const router = express.Router();

// baseUrl ===> /users
router.get('/info', userController.users_info_get);

module.exports = router;
