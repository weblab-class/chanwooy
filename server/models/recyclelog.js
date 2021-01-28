const mongoose = require("mongoose");

const RecycleLogSchema = new mongoose.Schema({
    recycled: String,
    date: String,
    googleid: String,
});

module.exports = mongoose.model("recyclelog", RecycleLogSchema);