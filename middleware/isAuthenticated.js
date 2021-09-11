module.exports.isAuthenticated = (req, res, next) => {
  // user is authenticated
  if (req.user) {
    return next();
  }
  return res.status(401).json({
    status: 'fail',
    message: 'User is not authenticated.',
  });
};
