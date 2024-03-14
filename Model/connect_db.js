// database.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://theodemany:azerty@cluster0.sdtdgb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client; // Retourne le client connecté
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
