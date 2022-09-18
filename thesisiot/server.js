const express=require("express");
const app = express();
const cors = require("cors");
const mongoose=require("mongoose");
const dotenv = require('dotenv').config(); 
const passport = require("passport")

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());

app.use(passport.initialize())
require('./passport')

//connect to mongodb
mongoose.connect(process.env.DB_ACCESS, () => console.log("DB connected"));
//require user routes
app.use("/", require("./routes/userRoute"));

//protected route 
app.get("/protected", passport.authenticate('jwt', {session:false}), (req, res) =>{
    res.status(200).send({
        success: true, 
        user: {
            id : req.user._id,
            email : req.user.email
        }
    })
})


app.listen(3001, function(){
    console.log("server is running at port 3001");
})