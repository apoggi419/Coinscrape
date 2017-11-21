const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true
  }
);

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
