const express = require('express');

// custom modules
const authRouter = require('./authRoutes');
const articleRouter = require('./articleRouts');
const userRouter = require('./userRoutes');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/articles', articleRouter);
router.use('/users', userRouter);
module.exports = router;
