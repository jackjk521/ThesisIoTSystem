const express = require("express");
const router = express.Router();
const User = require("../../../app/Models/UserModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")

router.route("/register").post((req, res) =>{ // works
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }) // using model instead of an object

    try{
        if(User.findOne({email: user.email}) > 0){   // neeed to fix this for no repetition of emails
            console.log("User already exists, try another email");
        }

        else{

            user.save().then (user => {
                res.send({
                    success: true, 
                    message: "User created successfully.",
                    user: user
                })
            }).catch(err =>{
                res.send({
                    success: false, 
                    message: "Error occurred in registering",
                    error: err
                    
                })
            })
        }

    }
    catch(err){
        console.log(err.message);
    }
  
})

router.route("/login").post((req, res) => {
    
        User.findOne({ email: req.body.email }).then(user => {

            if(!user){ // No user found
                    return res.status(401).send({
                    success: false,
                    message: "Could not find the user."
                    })
            }

            // const validPassword = bcrypt.compareSync(req.body.password, user.password);
            // console.log(validPassword);

            // if(bcrypt.compareSync(req.body.password, user.password)){ //incorrect password
            //     return res.status(401).send({
            //         success: false, 
            //         message: "Incorrect password"
            //     })
            // } //error in comparing fix later

        
            const payload =  {
                email : user.email,
                id : user._id
            }
    
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : "1d"} ) 
        
                return res.status(200).send({
                    user_id : user.id,
                    success: true,
                    message: "Logged in successfully.",
                    route: "Login", 
                    token: "Bearer " + token
                    })
            
        })

})

router.route("/dashboard").get(passport.authenticate('jwt', {session:false}), (req, res) => { 
    res.status(200).send({
        success: true, 
        user: {
            id : req.user._id,
            email : req.user.email
        }
    })
})

module.exports = router;