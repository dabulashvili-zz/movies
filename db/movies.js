const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rated: String,
  director: {
    type: String,
    required: true
  }
}, {
  collection: 'movies'
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', MovieSchema);
