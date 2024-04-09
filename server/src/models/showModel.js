const mongoose = require("mongoose");
const { Schema } = mongoose;

const showSchema = new Schema({
  showName: String,
  showType: String,
  place: String,
  pricePerTicket: Number,
  description: String,
  startTime: Number,
  endTime: Number,
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
