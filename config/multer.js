// core modules
const path = require('path')
// 3rd-party modules
const multer = require('multer')
// custome modules
const rootDir = require('../utils/rootDir')

module.exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootDir, 'image'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

module.exports.fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpg'
  ||
  file.mimetype === 'image/jpeg'
  ||
  file.mimetype === 'image/png'){
    cb(null, true)
  }else{
    cb(null, false)
  }
}