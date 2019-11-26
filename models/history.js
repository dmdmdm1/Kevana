const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    user_name: { type: Schema.Types.ObjectId, ref: "User" },

    practiced_video: { type: Schema.Types.ObjectId, ref: "Video" }
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
