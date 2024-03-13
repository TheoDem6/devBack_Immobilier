const { get } = require('../Controllers/controllers_logement');
const model = require('../../Model/connect_db');
const client =  model.connectToDatabase();
const bcrypt = require('bcrypt');

// Fonction pour crypter le mot de passe
async function encryptPassword(password) {
    try {
        // Générer un sel (salt)
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Crypter le mot de passe avec le sel
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Erreur lors du cryptage du mot de passe :", error);
        throw error; // Remonte l'erreur pour la gérer à un niveau supérieur si nécessaire
    }
}

// Fonction pour vérifier le mot de passe avec sa version cryptée
async function comparePasswords(password, hashedPassword) {
    try {
        // Comparer le mot de passe entré avec sa version cryptée
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error("Erreur lors de la comparaison des mots de passe :", error);
        throw error; // Remonte l'erreur pour la gérer à un niveau supérieur si nécessaire
    }
}


async function createUser(nom, email, mdp) {
    try {
        
        const collection = client.db("dpe").collection("td_client");
        // Création d'un nouvel utilisateur
        const newUser = {
            nom: nom,
            email: email,
            motDePasse: encryptPassword(mdp)
        };
        // Insertion de l'utilisateur dans la collection
        const result = await collection.insertOne(newUser);
        console.log(`Nouvel utilisateur ajouté avec l'ID : ${result.insertedId}`);
        return result.insertedId;
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        throw error; // Remonte l'erreur pour la gérer à un niveau supérieur si nécessaire
    } finally {
        // Assurez-vous de fermer la connexion après avoir terminé
        //await client.close();
    }
}
async function loginUser(email, password) {
    try {
        const collection = client.db("dpe").collection("td_client");
        // Trouver l'utilisateur avec l'email fourni
        const user = await collection.findOne({ email: email });
        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }
        // Vérifier si le mot de passe correspond
        const isPasswordMatch = await comparePasswords(password, user.motDePasse);
        if (!isPasswordMatch) {
            throw new Error("Mot de passe incorrect.");
        }
        console.log("Connexion réussie !");
        // Vous pouvez renvoyer l'utilisateur ou faire d'autres opérations ici
        return user;
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        throw error; // Remonte l'erreur pour la gérer à un niveau supérieur si nécessaire
    }
}


module.exports ={createUser,loginUser};
