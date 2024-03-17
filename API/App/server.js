// index.js
// const { connectToDatabase } = require('../../Model/connect_db');
// const userController = require('../Controllers/user_controller.js');
const express = require('express');
require('dotenv').config
let bodyParser = require('body-parser');
let client = require('../Controllers/client_controller');


const app = express();
let mongoose = require('mongoose');
// const client = require('../../Model/client.js');
const PORT = 3000;

const uri = "mongodb+srv://theodemany:azerty@cluster0.sdtdgb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//db connection      
mongoose.connect(uri);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.get("/", (req, res) => res.json({message: "Welcome to homepage"}));
app.route("/createUser").post(client.postClient)

// app.use('/', logmentControllers);

app.listen(PORT, () => {
    console.log()
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  module.exports = app; // for testing
  



