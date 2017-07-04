var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    image: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    category: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name: String
    }
});

module.exports = mongoose.model("Item", ItemSchema);