const mongoose = require('mongoose');
const { Schema } = mongoose;

// Notification Schema (same as before)
const notificationSchema = new Schema({
  type: String,
  projectId: String,
  userId: String,
  projectName: String,
  username: String,
  role: String,
  timestamp: Date,
});

// Embedded Email Schema for Inbox/Outbox
const emailSchema = new Schema({
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

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    department: {
      type: String,
      enum: ['EEE', 'CSE', 'AIML', 'ECE', 'CSBS', 'AIDS', 'MECH', 'IT'],
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    profilePicture: {
      type: String,
      default: 'default.jpg',
    },
    projectsActive: {
      type: [String],
      default: [],
    },
    projectsCompleted: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    notifications: {
      type: [notificationSchema],
      default: [],
    },
    inbox: {
      type: [emailSchema],
      default: [],
    },
    outbox: {
      type: [emailSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFaculty: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
