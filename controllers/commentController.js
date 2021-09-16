// 3rd-party modules
const { validationResult } = require('express-validator');
// custom modules
const Comment = require('../models/Comment');

module.exports.createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const userId = req.user._id;
  const { comment: content, articleId } = req.body;
  Comment.create({
    content,
    authorId: userId,
    articleId,
  }).then((comment) => {
    res.status(200).json({
      message: 'Adding comment successfully done',
    });
  });
};
module.exports.getArticleComments = (req, res, next) => {
  const articleId = req.params.id;
  Comment.find({ articleId })
    .sort({ createdAt: -1 })
    .populate('authorId')
    .then((comments) => {
      res.status(200).json({
        comments: comments.map((comment) => ({
          id: comment.id,
          date: comment.createdAt,
          content: comment.content,
          author: {
            firstname: comment.authorId.firstname,
            lastname: comment.authorId.lastname,
            avatar: comment.authorId.image,
          },
        })),
      });
    });
};
module.exports.deleteComment = (req, res, next) => {
  const commentId = req.params.id;
  Comment.findByIdAndRemove(commentId).then((deletedComment) => {
    if (!deletedComment) {
      return res.status(400).json({
        message: 'Deleting comment failed. Because comment not found',
      });
    }
    res.status(200).json({
      message: 'Deleting comment successfully done',
    });
  });
};
