const express = require('express');
const path = require('path'); // Importez path pour utiliser la fonction join
const router = express.Router();
const LogementService = require('../Service/Service_logement');


router.get('/', async (req, res) => {
    res.redirect('/login');
});
router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/login.html'));
});

router.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/register.html'));
});
router.post('/createUser', function (req, res){

    console.log(req);
    //const nom = req.body.nom;
    //const mail = req.body.mail;  
    //const mdp = req.body.mdp; 
    console.log("marche !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    
    try {
        //const userId = LogementService.createUser(nom, mail, mdp);
        res.status(200).json({ nom:"aaa" });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
});

router.post('/loginUser', async (req, res) => {
   
    const mail = req.body.mail;
    const mdp = req.body.mdp;

    try {
        const user = await LogementService.loginUser(mail, mdp);
        if (user) {
            res.status(200).json({ message: "Connexion réussie", user });
        } else {
            res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
});


module.exports = router; // Exportez le routeur
