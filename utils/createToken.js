const jwt = require('jsonwebtoken');

module.exports.createToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
};
