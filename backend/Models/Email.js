const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Email', emailSchema);
