const mongo = require('mongoose');

const NoteSchema = new mongo.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Note title cannot be more than 40 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Note Description cannot be more than 40 characters']
  }
});

module.exports = mongo.models.Note || mongo.model('Note', NoteSchema);