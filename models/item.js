var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        
    },
    image: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        type: {
            business: Boolean,
            owner: Boolean
        }
    },
    category: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name: String
    },
    location: {
        city: String,
        postal: String,
        street: String
    },
    type: {
        selling: Boolean,
        buying: Boolean
    },
    urgent: Boolean,
    highlighted: Boolean
    
});

module.exports = mongoose.model("Item", ItemSchema);