// 3rd-party modules
const bcrypt = require('bcryptjs');
// custom modules
const { validationResult } = require('express-validator');
const Article = require('../models/Article');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { deleteExtraImages } = require('../utils/deleteExtraImages');

module.exports.getAllUsers = (req, res, next) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((users) => {
      res.status(200).json({
        users: users.map((user) => ({
          id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.image,
          date: user.createdAt,
          role: user.role,
        })),
      });
    });
};

module.exports.getLoggedInUserInfo = (req, res, next) => {
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
module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  const userInfo = { user: null, articles: null };
  User.findById(userId).then((user) => {
    if (!user) {
      return res.status(403).json({
        message: 'User not found',
      });
    }
    userInfo.user = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      avatar: user.image,
      email: user.email,
    };
    Article.find({ authorId: userId })
      .sort({ createdAt: -1 })
      .then((articles) => {
        userInfo.articles = articles;
        res.status(200).json(userInfo);
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
module.exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId).then((deletedUser) => {
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    Article.deleteMany({ authorId: userId })
      .then((result) => {
        return Comment.deleteMany({ authorId: userId });
      })
      .then((result) => {
        res.status(200).json({
          message:
            'User and all of his(her) articles and comments deleted successfully',
        });
      });
  });
};
