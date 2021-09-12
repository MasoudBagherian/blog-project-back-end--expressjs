// core modules
const path = require('path');
const fs = require('fs');
// custom modules
const User = require('../models/User');
const Article = require('../models/Article');
const rootDir = require('./rootDir');

const deleteImages = (images) => {
  const imagePath = path.join(rootDir, 'image');
  fs.readdir(imagePath, (err, files) => {
    files.forEach((file) => {
      if (
        file !== process.env.DEFAULT_ARTICLE_IMAGE &&
        file !== process.env.DEFAULT_USER_AVATAR &&
        !images.includes(file)
      ) {
        fs.unlink(path.join(imagePath, file), (err) => {
          // console.log(err);
        });
      }
    });
  });
};

module.exports.deleteExtraImages = () => {
  let images = [];
  User.find()
    .then((users) => {
      images = users.map((user) => user.image);
      return Article.find();
    })
    .then((articles) => {
      images = [...images, ...articles.map((article) => article.image)];
      deleteImages(images);
    });
};
