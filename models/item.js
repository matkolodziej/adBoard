var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    adtype: String,
    title: String,
    description: String,
    price: String,
    image: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
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
        address: String
    },
    
    promotion: {
        highlighted: {type: Boolean, default: false},
        urgent: {type: Boolean, default: false},
        top: {type: Boolean, default: false},
        homepage: {type: Boolean, default: false}
    },
    added: {
        type: Date,
        default: Date.now
    },
    contact: {
        phone: String,
        email: String
    }
    
});

module.exports = mongoose.model("Item", ItemSchema);