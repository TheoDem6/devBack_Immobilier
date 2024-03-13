// index.js
const { connectToDatabase } = require('../../Model/connect_db');
const logmentControllers = require('../Controllers/controllers_logement');
const express = require('express');
require('dotenv').config

const app = express();
const PORT = 3000;

app.use('/', logmentControllers);

app.listen(PORT, () => {
    console.log()
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  


