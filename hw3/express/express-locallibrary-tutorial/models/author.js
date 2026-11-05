const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 50 },
  lastName: { type: String, required: true, maxLength: 50 },
  DOB: { type: Date },
  death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  return this.lastName + ", " + this.firstName;
});

AuthorSchema.virtual("lifespan").get(function () {
  let lifetime = "";
  if (this.date_of_birth) {
    lifetime = this.date_of_birth.getFullYear();
  }
  lifetime += " - ";
  if (this.date_of_death) {
    lifetime += this.date_of_death.getFullYear();
  }
  return lifetime;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
