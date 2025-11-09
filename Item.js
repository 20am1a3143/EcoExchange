const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  condition: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['available','exchanged'], default: 'available' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
