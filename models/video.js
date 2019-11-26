const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  video_id: String,
  link: String,
  title: String,
  channel: String,
  length: Number
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
