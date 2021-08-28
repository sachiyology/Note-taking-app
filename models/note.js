const { Schema, model } = require('mongoose');

// Make schema = Bouncer at the club

const noteSchema = new Schema({
  title: { type: String, required: true, unique: true },
  noteBody: String,
  comments: [ {type: Schema.Types.ObjectId, ref: 'Comment'} ]
}, {
  timestamps: true
})

module.exports = model('Note', noteSchema )
