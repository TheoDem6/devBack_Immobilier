let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let ClientSchema = new Schema(
  {
    nom: { type: String, required: true },
    mail: { type: String, required: true },
    mdp: { type: String, required: true},
  }, 
  { 
    versionKey: false
  }
);

//Exports the client for use elsewhere.
module.exports = mongoose.model('client', ClientSchema);