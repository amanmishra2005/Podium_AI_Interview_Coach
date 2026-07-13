const mongoose = require('../mongoose-provider');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['query', 'suggestion', 'bug', 'other'],
    default: 'query'
  },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
