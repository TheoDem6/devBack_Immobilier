// index.js
const express = require('express');
require('dotenv').config
let bodyParser = require('body-parser');
let client = require('../Controllers/client_controller');


const app = express();
let mongoose = require('mongoose');

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

app.get("/", client.getPageRegister); // Modification ici
app.route("/createUser")
    .get(client.getPageRegister)
    .post(client.postClient);

app.route("/loginUser")
    .get(client.getPageLogin)
    .post(client.postClientLogin)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  module.exports = app; // for testing
  



