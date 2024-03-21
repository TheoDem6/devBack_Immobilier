let serviceClient = require("../Service/Service_client");
let serviceLogement = require("../Service/Service_logement");

const path = require('path'); 
const express = require('express');
const router = express.Router();
const tocken = require('../jwt/tocken');

router.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/register.html'));
});

router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/login.html'));
});
router.get('/', async (req, res) => {
    res.redirect('/login');
});
router.get('/logement', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/logement.html'));
});

router.post('/loginUser', async (req, res) => {
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    try {
        let tockenClient =  serviceClient.loginUser(mail, mdp);
        console.log(tockenClient);
        res.send(tockenClient);
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
});


router.post('/registerUser', async (req, res) => {
    try {
        const nom = req.body.nom;
        const mail = req.body.mail;  
        const mdp = req.body.mdp;
        let respt = await serviceClient.createUser(nom, mail, mdp); // Attendez que la fonction createUser se termine
        res.status(200).send(respt);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.get('/logement',async (req, res) =>{
    
    let logementTab = await serviceLogement.getAll();
    res.json(logementTab);
});

router.post('/logement/search', async (req, res) => {
    try {
        const { codePostal, Etiquette_GES, Etiquette_DPE } = req.body; // Destructuring assignment
        const searchData = {
            "Code_postal_(BAN)": parseInt(codePostal),
            Etiquette_GES,
            Etiquette_DPE
        };
        let respt = await serviceLogement.getLogement(searchData);
        console.log(respt);
        res.status(200).json(respt); // Assuming respt contains the response data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



module.exports = router;