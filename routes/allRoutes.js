const express = require('express')

// custom modules
const authRouter = require('./authRoutes');
const router = express.Router()

router.use('/auth', authRouter)


module.exports = router