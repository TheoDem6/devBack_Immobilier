// index.js
const express = require('express');
require('dotenv').config({ debug: true })
let bodyParser = require('body-parser');
const client_controller = require('../Controllers/client_controller');
process.env.ACCESS_URI_DB;


const app = express();
let mongoose = require('mongoose');

const PORT = 3000;

const uri = process.env.ACCESS_URI_DB;

//db connection      
mongoose.connect(uri);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use("/", client_controller); // Modification ici
// app.route("/createUser")
//     .get(client.getPageRegister)
//     .post(client.postClient);

// app.route("/loginUser")
//     .get(client.getPageLogin)
//     .post(client.postClientLogin)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  module.exports = app; // for testing
  



