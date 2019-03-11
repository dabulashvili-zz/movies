const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  }
}, {
  collection: 'comments'
});

CommentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentsSchema);
