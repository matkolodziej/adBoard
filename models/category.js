var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
    name: String,
    parent: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name: String
    },
    items: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    }
});

module.exports = mongoose.model("Category", CategorySchema);