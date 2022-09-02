const express=require("express");
const app = express();
const cors = require("cors");
const mongoose=require("mongoose");
const dotenv = require('dotenv').config(); 

app.use(cors());
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.DB_ACCESS, () => console.log("DB connected"));
//require route
app.use("/", require("./routes/userRoute"));

app.listen(3001, function(){
    console.log("server is running at port 3001");
})