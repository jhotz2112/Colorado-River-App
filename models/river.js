const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const riverSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  datePosted: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  },
  adminDifficulty: String,
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  open: { type: Boolean, default: false },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('River', riverSchema);