const {
    model,
    Schema,
    Schema: {
      Types: { ObjectId },
    },
  } = require("mongoose");
  
  const schema = new Schema({
    login: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: ''
    },
    chats: [{
      type: ObjectId,
      ref: "Chat",
    }]
  });
  
  module.exports = model("User", schema);
  