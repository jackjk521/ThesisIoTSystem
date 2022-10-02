const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config(); 
const passport = require("passport")

//Models/Schemas
const User = require("../../app/Models/UserModel");
const State = require("../../app/Models/stateModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());

app.use(passport.initialize())
require('./passport')

//connect to mongodb
const connection = mongoose.connect(process.env.DB_ACCESS, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
 }); 
 
if(connection) {
    console.log("DB connected")
}


// Collection creation here once connected to the database
User.createCollection().then(function(collection) {
    console.log('userCollection is created')
})

State.createCollection().then(function(collection) {
    console.log('stateCollection is created')
})

//require user routes
app.use("/", require("../js/routes/userRoute"));

app.listen(3001, function(){
    console.log("server is running at port 3001");
})