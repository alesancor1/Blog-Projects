const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true
    },
    useragent: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('Log', LogSchema);