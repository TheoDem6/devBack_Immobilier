const express = require('express');
let mongoose = require('mongoose');

let Client = require('../../Model/client');

const path = require('path'); // Importez path pour utiliser la fonction join
const router = express.Router();
const LogementService = require('../Service/Service_logement');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


// router.get('/', async (req, res) => {
//     res.redirect('/login');
// });
// router.get('/login', async (req, res) => {
//     res.sendFile(path.join(__dirname, '../front/login.html'));
// });

// router.get('/register', async (req, res) => {
//     res.sendFile(path.join(__dirname, '../front/register.html'));
// });
router.post('/createUser', jsonParser ,function (req, res){
    console.log("Creation utilisateur ")
    var newClient = new Client(req.body)
    const nom = req.body.nom;
    const mail = req.body.mail;  
    const mdp = req.body.mdp;

    newClient.save((err,book) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Book successfully added!", book });
        }
    });
    // try {
    //     const userId = LogementService.createUser(nom, mail, mdp);
    //     res.status(200).json({ userId });
    // } catch (error) {
    //     console.error("Erreur lors de la création de l'utilisateur :", error);
    //     res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    // }
});

// router.post('/loginUser', jsonParser,function (req, res)  {
   
//     const mail = req.body.mail;
//     const mdp = req.body.mdp;

//     try {
//         const user = LogementService.loginUser(mail, mdp);
//         if (user) {
//             res.status(200).json({ message: "Connexion réussie", user });
//         } else {
//             res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
//         }
//     } catch (error) {
//         console.error("Erreur lors de la connexion de l'utilisateur :", error);
//         res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
//     }
// });


// module.exports = router; // Exportez le routeur

