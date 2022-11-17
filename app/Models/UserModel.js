
const mongoose = require("mongoose");

const userSchema = {
    username: {
        type: String, 
        required:true,
        unique: true
    },
    password:{
        type: String, 
        required: true,
        min: 8
    }

}

const User = mongoose.model("User", userSchema);

module.exports = User;  