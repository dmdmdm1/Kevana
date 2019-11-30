
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String, 
  email: String,
  password: String,
  favorites : [ {type: Schema.Types.ObjectId, ref: 'Video'}],
  follows: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;