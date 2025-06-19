const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/pinterest')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  dp: { type: String }, // URL or path to display picture
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true }
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
// This schema defines the structure of a User document in MongoDB using Mongoose.