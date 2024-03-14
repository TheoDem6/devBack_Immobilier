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
router.get('/createUser', async (req, res) => {
    const nom = req.query.nom;
    const mail = req.query.mail;  
    const mdp = req.query.mdp; 
    
    LogementService.createUser(nom,mail,mdp);
   
});

router.get('/loginUser',async(req,res)=>{
    const mail = req.query.mail;
    const mdp = req.query.mdp;

    LogementService.loginUser(mail,mdp);
});



module.exports = router; // Exportez le routeur
