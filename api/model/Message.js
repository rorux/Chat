const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const schema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  chat: {
    type: ObjectId,
    ref: "Chat",
  },
  text: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Message", schema);