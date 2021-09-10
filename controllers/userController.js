// custom modules
const Article = require('../models/Article');

module.exports.users_info_get = (req, res, next) => {
  const user = req.user;
  Article.find({ authorId: user._id }).then((articles) => {
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
