
const mongoose = require("mongoose");

const userSchema = {
    name: {
        type: String, 
    },
    
}

const state = mongoose.model("state", userSchema); // will look for states (plural of state) collections

module.exports = state;  