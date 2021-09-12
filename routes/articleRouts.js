// 3rd-party modules
const express = require('express');
// custom modules
const articleController = require('../controllers/articleController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const articleValidation = require('../middleware/validation/article');
const router = express.Router();

// baseUrl ===> /articles

router.post(
  '/',
  isAuthenticated,
  [articleValidation.validateTitle, articleValidation.validateContent],
  articleController.articles_post
);
router.get('/:id', isAuthenticated, articleController.articles_get_one);
module.exports = router;
