// 3rd-party modules
const bcrypt = require('bcryptjs');
// custom modules
const { validationResult } = require('express-validator');
const Article = require('../models/Article');
const User = require('../models/User');
const { deleteExtraImages } = require('../utils/deleteExtraImages');

module.exports.getUserInfo = (req, res, next) => {
  const user = req.user;
  Article.find({ authorId: user._id })
    .sort({ createdAt: -1 })
    .then((articles) => {
      res.status(200).json({
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          avatar: user.image,
          email: user.email,
        },
        articles,
      });
    });
};
module.exports.changePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const user = req.user;
  const { newPassword } = req.body;
  bcrypt
    .hash(newPassword, 12)
    .then((hashedPassword) => {
      req.user.password = hashedPassword;
      return req.user.save();
    })
    .then((user) => {
      res.status(200).json({
        message: 'Changing password successfully done',
      });
    });
};
module.exports.editUserProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const user = req.user;
  const image = req.file;
  const { username, firstname, lastname, email } = req.body;
  User.findById(user._id).then((user) => {
    user.firstname = firstname.trim();
    user.lastname = lastname.trim();
    user.email = email.trim().toLowerCase();
    user.username = username.trim();
    user.image = image ? image.filename : user.image;
    return user.save().then((user) => {
      deleteExtraImages();
      res.status(200).json({
        message: 'Profile edited successfully',
      });
    });
  });
};
