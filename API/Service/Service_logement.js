const { get } = require('../Controllers/controllers_logement');
const model = require('../../Model/connect_db');

const bcrypt = require('bcrypt');


async function encryptPassword(password) {
    try {
       
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
      
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Erreur lors du chiffrement du mot de passe :", error);
        throw error; 
    }
}

// Fonction pour vérifier le mot de passe avec sa version chiffrée
async function comparePasswords(password, hashedPassword) {
    try {
        // Comparer le mot de passe entré avec sa version chiffrée
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error("Erreur lors de la comparaison des mots de passe :", error);
        throw error; 
    }
}


async function createUser(nom, email, mdp) {
    try {
        const client = await model.connectToDatabase(); // Attendez que la connexion soit établie

        const collection = client.db("dpe").collection("td_client");
        console.log(nom);
        console.log(email);
        mdp = await encryptPassword(mdp);
        console.log(mdp);
        
        // Création d'un nouvel utilisateur
        const newUser = {
            nom: nom,
            email: email,
            motDePasse: mdp
        };
        // Insertion de l'utilisateur dans la collection
        const result = await collection.insertOne(newUser);
        console.log(`Nouvel utilisateur ajouté avec l'ID : ${result.insertedId}`);
        return result.insertedId;
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        throw error; 
    } finally {
      
        //await client.close();
    }
}
async function loginUser(email, password) {
    try {
        const client = await model.connectToDatabase(); // Attendez que la connexion soit établie
        const collection = client.db("dpe").collection("td_client");
        // Trouver l'utilisateur avec l'email fourni
        const user = await collection.findOne({ email: email });
        console.log(user.motDePasse);
        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }
        // Vérifier si le mot de passe correspond
        const isPasswordMatch = await comparePasswords(password, user.motDePasse);
        if (!isPasswordMatch) {
            throw new Error("Mot de passe incorrect.");
        }
        console.log("Connexion réussie !");
       
        return user;
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        throw error; 
    }
}


module.exports ={createUser,loginUser};
