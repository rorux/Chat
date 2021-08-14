const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    default: "",
  },
  owner: {
    type: ObjectId,
    ref: "User",
  }
});

module.exports = model("Chat", schema);