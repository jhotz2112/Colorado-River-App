const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    userDifficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

const riverSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lattitude: String,
    longitude: String,
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
    },
    open: { type: Boolean, default: false },
    dateVisited: {
        type: Date,
        default: function () {
            return new Date().getFullYear();
        }
    },
    comments: [commentSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

module.exports = mongoose.model('River', riverSchema);