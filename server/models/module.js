const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    title: String,
    content: String,
    moduleNumber: Number,
    nth: Number,
});

module.exports = mongoose.model("module", ModuleSchema);