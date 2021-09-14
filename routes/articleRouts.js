// 3rd-party modules
const express = require('express');
// custom modules
const articleController = require('../controllers/articleController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const articleValidation = require('../middleware/validation/article');
const router = express.Router();

// baseUrl ===> /articles
router.get('/:id', isAuthenticated, articleController.getArticle);

router.post(
  '/',
  isAuthenticated,
  [articleValidation.validateTitle, articleValidation.validateContent],
  articleController.createArticle
);
router.put(
  '/:id',
  isAuthenticated,
  [articleValidation.validateTitle, articleValidation.validateContent],
  articleController.updateArticle
);
module.exports = router;
