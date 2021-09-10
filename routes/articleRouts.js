// 3rd-party modules
const express = require('express');
// custom modules
const articleController = require('../controllers/articleController');
const articleValidation = require('../middleware/validation/article');
const router = express.Router();

// baseUrl ===> /articles

router.post(
  '/',
  [articleValidation.validateTitle, articleValidation.validateContent],
  articleController.articles_post
);

module.exports = router;
