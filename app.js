// core modules
const path  = require('path')
// 3rd-party modules
const express = require('express')
const dotenv = require('dotenv')
const rootDir = require('./utils/rootDir')
const multer = require('multer')
const morgan = require('morgan')
// custom modules
const connectDbAndRunServer = require('./config/db')
const { storage, fileFilter } = require('./config/multer')
const mainRouter = require('./routes/allRoutes');

const app = express()
// setup config
dotenv.config({path:path.join(rootDir, 'config', 'config.env') })
// parse request body with json format
app.use(express.json())

app.use(morgan('dev'))
// multer config
app.use(multer({storage, fileFilter}).single('image'))
// handle cors error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
// serve static files
app.use('/assets', (req, res) => {
  res.sendFile(path.join(rootDir, req.url))
})

app.use(mainRouter)
// run server and connect to database
connectDbAndRunServer(app, process.env.MONGODB_URI, process.env.PORT || 5000)
