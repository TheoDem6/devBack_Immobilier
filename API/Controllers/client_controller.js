let serviceClient = require("../Service/Service_logement");
const path = require('path'); 

async function postClient(req, res) {
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
}
async function getPageRegister(req, res){
    res.sendFile(path.join(__dirname, '../front/register.html')); 
}
async function getPageLogin(req,res){
    res.sendFile(path.join(__dirname, '../front/login.html')); 
}
async function postClientLogin(req,res){
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    console.log(mail,mdp);
    try {
        let user =  serviceClient.loginUser(mail, mdp);
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
};


module.exports = { postClient, getPageRegister,getPageLogin,postClientLogin };