const mongoose = require("mongoose");

const AboutSectionSchema = new mongoose.Schema({
    heading: String,
    content: String,
});

module.exports = mongoose.model("aboutsection", AboutSectionSchema);