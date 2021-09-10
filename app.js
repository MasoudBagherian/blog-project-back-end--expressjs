// core modules
const path = require('path');
// 3rd-party modules
const express = require('express');
const dotenv = require('dotenv');
const rootDir = require('./utils/rootDir');
const multer = require('multer');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
// setup config
dotenv.config({ path: path.join(rootDir, 'config', 'config.env') });
// custom modules
const connectDbAndRunServer = require('./config/db');
const { storage, fileFilter } = require('./config/multer');
const mainRouter = require('./routes/allRoutes');
const User = require('./models/User');
const app = express();
// parse request body with json format
app.use(express.json());
// app.use(morgan('dev'));
// multer config
app.use(multer({ storage, fileFilter }).single('image'));
// handle cors error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// serve static files
app.use('/assets', (req, res) => {
  res.sendFile(path.join(rootDir, req.url));
});

app.use((req, res, next) => {
  const token = req.query.token;
  // user is not authenticated
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    // token is not verified
    if (err) {
      console.log('token is not verified');
      return next();
    }
    // token is verified(user is authenticated)
    const userId = decodedToken.userId;
    if (!userId) {
      return next;
    }
    User.findById(userId).then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      return next();
    });
  });
});

app.use(mainRouter);
// run server and connect to database
connectDbAndRunServer(app, process.env.MONGODB_URI, process.env.PORT || 5000);
