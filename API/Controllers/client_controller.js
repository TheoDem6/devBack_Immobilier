let serviceClient = require("../Service/Service_logement");
const path = require('path'); 
const express = require('express');
const router = express.Router();

router.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/register.html'));
});

router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/login.html'));
});

router.post('/loginUser', async (req, res) => {
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    try {
        let tocken =  serviceClient.loginUser(mail, mdp);
        res.send(tocken);
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



module.exports = router;