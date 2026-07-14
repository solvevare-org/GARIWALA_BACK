const mongoose = require('mongoose')

const specItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false })

const specGroupSchema = new mongoose.Schema({
  label: { type: String, required: true },
  items: [specItemSchema],
}, { _id: false })

const productSchema = new mongoose.Schema({
  id:       { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  model:    { type: String, required: true },
  category: { type: String, required: true, default: 'Cars' },
  type:     { type: String, required: true },
  inStock:  { type: Boolean, default: true },
  image:    { type: String, required: true },
  overview: { type: String, required: true },
  specs:    [{ type: String }],
  specGroups: [specGroupSchema],
  images:   [{ type: String }],
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
