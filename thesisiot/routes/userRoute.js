const express = require("express");
const router = express.Router();
const User = require("../app/Models/usermodel");
const bcrypt = require("bcryptjs")

router.route("/register").post((req, res) =>{

    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }
        
    try{
        if(User.findOne({email: userData.email}) > 0){   // neeed to fix this for no repetition of emails
            console.log("User already exists, try another email");
        }
        else{
            const newUser = new User(userData);
            newUser.save();
        }

    }
    catch(err){
        console.log(err.message);
    }
  
})



router.route('/login').post((req, res) => {

        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.findOne({ email: userData.email }, function (err, user) {
            if (err) return handleError(err);
                console.log('%s %s is a %s.', user.firstname, user.lastname, user.email)
            if (bcrypt.compareSync(userData.password, user.password)){
                console.log("dash");
                res.redirect('/dashboard'); //cant redirect to dashboard
            }
            else{
                console.log("user creds");
            }
        })

  })


module.exports = router;