const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  type: String,
  projectId: String,
  userId: String,
  username: String,
  role: String,
  timestamp: Date,
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    projectsActive:{
      type:[String],
      default:[],
    },
    projectsCompleted:{
      type:[String],
      default:[],
    },
    notifications: {
      type: [notificationSchema],
      default: [],
    },
    profilePicture: {
      type: String,
      default: 'default.jpg', 
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
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student', 
    },
    department: {
      type: String,
      enum: [
        'EEE', 'CSE', 'AIML', 'ECE', 'CSBS', 'AIDS', 'MECH', 'IT',
      ],
      required: true,
    },
    skills: {
      type: [String], 
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
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
