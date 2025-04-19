const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    link: { type: String, default: "" },
    description: { type: String, required: true },
    image: { type: String },
    likes: { type: Number, default: 0 },  
    createdAt: { type: Date, default: Date.now },
    likedBy: [{ type: String, default: [] }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);