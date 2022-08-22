const mongoose = require("mongoose");

const userSchema = {
    firstname: {
        type: String, 
    },
    lastname: {
        type: String, 
    },
    email: {
        type: String, 
        required:true,
        unique: true
    },
    password:{
        type: String, 
        required: true
    }

}

// userSchema.statics.isEmailInUse = async function(email) {
//     if(!email) throw new Error("invalid");

//     try{
//         const user = await this.findOne({email});

//         if(user) return false

//             return true;       
//     }
//     catch (err){
//             console.log("error in isEmailInUse", err.message);
//             return false;
//     }
// }

const User = mongoose.model("User", userSchema);

module.exports = User;  