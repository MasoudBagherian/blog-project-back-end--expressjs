// 3rd-party modules
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// custom modules
const User = require('../models/User');
const { createToken } = require('../utils/createToken');

module.exports.signup_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const image = req.file;
  // console.log(image);
  const { firstname, lastname, username, email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      return User.create({
        firstname,
        lastname,
        username,
        password: hashedPassword,
        email: email.toLowerCase(),
        image: image ? image.filename : process.env.DEFAULT_USER_AVATAR,
      });
    })
    .then((result) => {
      res.status(200).json({
        message: 'User added to the database successfully',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.login_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errCode: 100,
      errMsgs: errors.array(),
    });
  }
  const { email } = req.body;
  User.findOne({ email: email.toLowerCase() }).then((user) => {
    const token = createToken(user._id.toString());
    // res.cookie('jwt-token', token, {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 1000,
    // });
    return res.status(200).json({
      token,
      userId: user._id,
      expiresIn: 1000 * 60 * 60 * 24,
      role: user.role,
    });
  });
};
