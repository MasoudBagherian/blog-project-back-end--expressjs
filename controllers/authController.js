const User = require('../models/User')
module.exports.signup_post = (req, res, next) => {
  const image = req.file
  console.log(image)
  const {firstname, lastname, username,email, password} = req.body
  User.create({
    firstname, lastname, username, password, email,
    image: image? image.filename: process.env.DEFAULT_USER_AVATAR
  })
  .then(result => {
    res.status(200).json(
      {
        message: 'signup post'
      }
    )
  })
  .catch(err => {
    console.log(err)
  })
  
}

