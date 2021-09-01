const mongoose = require('mongoose')

const connectDb  = (app, mongoUri, port) => {
  mongoose.connect(mongoUri)
  .then(result => {
    console.log('Database connectd successfully')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.log(err.message)
  })
} 
module.exports = connectDb