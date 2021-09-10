// 3rd-party modules
const { validationResult } = require('express-validator');
// custom modules
const Article = require('../models/Article');

module.exports.articles_post = (req, res, next) => {
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
