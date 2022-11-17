const express = require("express");
const router = express.Router();
const User = require("../../../app/Models/UserModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")

router.route("/register").post((req, res) =>{ // works
    const user = User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }) 

    try{
        if(User.findOne({username: user.username}) > 0){  
            console.log("User already exists, try another username");
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
    
        User.findOne({ username: req.body.username }).then(user => {

            if(!user){ // No user found
                    return res.status(401).send({
                    success: false,
                    message: "Could not find the user."
                    })
            }

            // password validation 

            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword){ // if incorrect password
                return res.status(401).send({
                    success: false, 
                    message: "Incorrect password"
                })
            } 
            else{
                const payload =  {
                    username : user.username,
                    id : user._id
                }
        
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn : "1d"} ) 

                    return res.status(200).send({
                        user_id : user.id,
                        success: true,
                        message: "Logged in successfully for testing message", //works
                        route: "Login", 
                        token: "Bearer " + token
                        })

                }
                
        })
})

router.route("/dashboard").get(passport.authenticate('jwt', {session:false}), (req, res) => { 
    res.status(200).send({
        success: true, 
        user: {
            id : req.user._id,
            username : req.user.username
        }
    })
})

module.exports = router;