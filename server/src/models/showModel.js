const mongoose = require("mongoose");
const { Schema } = mongoose;

const showSchema = new Schema({
  showName: String,
  showType: [String],
  place: String,
  price: Number,
  date: String,
  startTime: String,
  endTime: String,
  description: String,
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
