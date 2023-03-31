require("dotenv").config();
const express = require("express");
// const express = require("express");

const app = express();
const check =require("./routes/check")
const check1=require('./routes/check1')
const upload = require('./routes/upload')
const signup = require('./routes/signup')
const cors = require("cors");
const connection = require("./db");
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/check", check);
app.use('/api/sim',check1);
app.use('/upload',upload);
app.use('/signup',signup);
app.listen("5000", () => {
    console.log("Server is running!");
  });