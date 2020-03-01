const mongoose = require('mongoose')

const { Schema } = mongoose

const PictureSchema = new Schema({
  name: { type: String, required: true },
  source: { type: String, required: true },
})

module.exports = mongoose.model('picture', PictureSchema)
