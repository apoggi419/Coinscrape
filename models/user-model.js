const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [/.+@.+/, "Please enter a valid email address."]
    },
    encryptedPassword: { type: String },
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
