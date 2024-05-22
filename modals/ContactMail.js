const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email_id: { type: String },
  name: { type: String },
  email: { type: String },
  message: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String },
});

module.exports = mongoose.model("contact_mail", emailSchema);