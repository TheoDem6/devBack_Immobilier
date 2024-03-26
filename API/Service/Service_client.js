let mongoose = require('mongoose');
let client = require('../../Model/client');
const bcrypt = require('bcrypt');
const tocken = require('../jwt/tocken');




async function encryptPassword(password) {
    try {
       
        const saltRounds = 10;
        const salt = await  bcrypt.genSalt(saltRounds);
        
        const hashedPassword =  await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.error("Erreur lors du chiffrement du mot de passe :", error);
        throw error; 
    }
}

async function casErreur(){
    let err = new Error("mdp")
    var data = '{ "mdp": { "kind": "required", "path": "mdp"} }'
    var t = JSON.parse(data)
    err.errors = t
    return err;
}

async function createUser(nom, email, mdpClient) {
    try {
        // //Chiffrement du mot de passe
        if (mdpClient === undefined) {
            let err = new Error("mdp")
            var data = '{ "mdp": { "kind": "required", "path": "mdp"} }'
            var t = JSON.parse(data)
            err.errors = t
            let error = casErreur();
            throw error;
        }
        
        console.log(nom);

        const mdpClientCypher = await encryptPassword(mdpClient);

        // Création du nouveau client
        const newClient = new client({ nom, mail: email, mdp: mdpClientCypher });

        // Enregistrement du nouveau client
        const savedClient = await newClient.save();

        console.log('Client enregistré avec succès :', savedClient.mail);
        return savedClient;
    } catch (error) {
        throw error;
    }
}
async function loginUser(email, password) {
    try {
        // Trouver l'utilisateur avec l'email fourni
        const user = await client.findOne({ mail: email });
        if (!user) {
            console.log("Utilisateur non trouvé !");
            return null; // L'utilisateur n'existe pas, retournez null ou lancez une erreur selon vos besoins
        }
        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.mdp);
        if (!passwordMatch) {
            console.log("Mot de passe incorrect !");
            return null; // Le mot de passe ne correspond pas, retournez null ou lancez une erreur selon vos besoins
        }

        // Authentification réussie, retournez l'utilisateur
        console.log("Utilisateur authentifié :", user.toObject());
        let userTocken = tocken.transformUserToTocken(user);
        
        
        const genTocken = tocken.generateAccessToken(userTocken);
    
        return genTocken;
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        throw error; // Lancez une erreur pour être attrapée par l'appelant
    }
}



module.exports ={createUser,loginUser};

