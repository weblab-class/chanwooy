const mongoose = require("mongoose");

const GameResourceSchema = new mongoose.Schema({
    recyclable: Boolean,
    name: String,
});

module.exports = mongoose.model("gameresource", GameResourceSchema);