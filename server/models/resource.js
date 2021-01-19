const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    organization: String,
    url: String,
});

module.exports = mongoose.model("resource", ResourceSchema);