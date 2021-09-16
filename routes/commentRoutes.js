// 3rd-party modules
const express = require('express');
// custom modules
const { isAuthenticated } = require('../middleware/isAuthenticated');
const commentController = require('../controllers/commentController');
const commentValidation = require('../middleware/validation/comment');

const router = express.Router();
// baseUrl ===> /comments

router.post(
  '/',
  isAuthenticated,
  [commentValidation.validateComment],
  commentController.createComment
);
router.get(
  '/article/:id',
  isAuthenticated,
  commentController.getArticleComments
);
router.delete('/:id', isAuthenticated, commentController.deleteComment);
module.exports = router;
