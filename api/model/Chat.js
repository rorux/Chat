const {
  model,
  Schema,
} = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    default: "",
  }
});

module.exports = model("Chat", schema);