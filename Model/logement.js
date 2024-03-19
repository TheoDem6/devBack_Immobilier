let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Logement schema definition
let LogementSchema = new Schema(
  {
    N_département_BAN: { type: Number, required: true },
    Date_réception_DPE: { type: Date, required: true },
    Date_établissement_DPE: { type: Date, required: true },
    Date_visite_diagnostiqueur: { type: Date, required: true },
    Etiquette_GES: { type: String, required: true },
    Etiquette_DPE: { type: String, required: true },
    Année_construction: { type: Number, required: true },
    Surface_habitable_logement: { type: Number, required: true },
    Adresse_BAN: { type: String, required: true },
    Code_postal_BAN: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

// Exporte le modèle Logement pour une utilisation ultérieure.
module.exports = mongoose.model('dpe', LogementSchema);