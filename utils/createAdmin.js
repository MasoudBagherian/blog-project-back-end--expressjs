// 3rd-party modules
const bcrypt = require('bcryptjs');
// custom modules
const User = require('../models/User');
const admin = {
  firstname: 'freddie',
  lastname: 'jackson',
  username: 'freddie1985',
  email: 'freddie@test.com',
  password: 'Freddie1985Queen',
  role: 'admin',
  image: process.env.DEFAULT_USER_AVATAR,
};
module.exports.createAdmin = () => {
  User.findOne({ role: 'admin' })
    .then((user) => {
      if (user) {
        return console.log('Admin already created');
      }
      bcrypt
        .hash(admin.password, 12)
        .then((hashedPassword) => {
          return User.create({ ...admin, password: hashedPassword });
        })
        .then((user) => {
          console.log('Admin created successfully');
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
