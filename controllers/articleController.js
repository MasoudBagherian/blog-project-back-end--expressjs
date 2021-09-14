// 3rd-party modules
const { validationResult } = require('express-validator');
// custom modules
const Article = require('../models/Article');
const { deleteExtraImages } = require('../utils/deleteExtraImages');
module.exports.createArticle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const imageName = req.file
    ? req.file.filename
    : process.env.DEFAULT_ARTICLE_IMAGE;
  const { title, content, status } = req.body;
  Article.create({
    title,
    content,
    status,
    image: imageName,
    authorId: req.user._id,
  }).then((user) => {
    res.status(200).json({
      message: 'Article added successfully',
    });
  });
};
module.exports.getArticle = (req, res, next) => {
  const articleId = req.params.id;
  Article.findById(articleId)
    .populate('authorId')
    .then((article) => {
      if (!article) {
        return res.status(403).json({
          message: 'Article with this ID not found',
        });
      }
      // console.log(article);
      res.status(200).json({
        article: {
          title: article.title,
          content: article.content,
          image: article.image,
          date: article.createdAt,
          status: article.status,
        },
        author: {
          firstname: article.authorId.firstname,
          lastname: article.authorId.lastname,
          avatar: article.authorId.image,
        },
      });
    });
};
module.exports.updateArticle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const articleId = req.params.id;
  const image = req.file;
  const { content, title, status } = req.body;
  Article.findById(articleId)
    .then((article) => {
      article.title = title;
      article.content = content;
      article.status = status;
      article.image = image ? image.filename : article.image;
      return article.save();
    })
    .then((article) => {
      deleteExtraImages();
      res.status(200).json({
        message: 'Updating article successfully done',
      });
    });
};
